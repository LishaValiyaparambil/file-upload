import { uploadToS3, deleteFromS3, getSignedUrl } from '../utils/aws';
import { UploadedFile, UploadOptions, UploadResult } from '../types/file.interface';
import sharp from 'sharp';

export class FileService {
  static async uploadFile(file: UploadedFile, options?: UploadOptions): Promise<UploadResult> {
    try {
      const filename = `${Date.now()}-${file.originalname}`

      // Resize the image if requested
      if (options?.resize) {
        const resizedImage = await sharp(file.buffer)
          .resize(options.resize.width, options.resize.height)
          .toBuffer();
        await uploadToS3(resizedImage, `uploads/${filename}.jpg`, 'image/jpeg');
      } else {
        await uploadToS3(file.buffer, `uploads/${filename}${file.originalname}`, file.mimetype);
      }

      // Generate thumbnails if requested
      let thumbnailUrls: string[] | undefined;
      if (options?.thumbnailSizes) {
        thumbnailUrls = await Promise.all(
          options.thumbnailSizes.map(async (size) => {
            const thumbnail = await sharp(file.buffer).resize(size).toBuffer();
            const thumbnailKey = options.thumbnailFolder
              ? `${options.thumbnailFolder}/${filename}-${size}.jpg`
              : `uploads/${filename}-${size}.jpg`;
            return uploadToS3(thumbnail, thumbnailKey, 'image/jpeg');
          })
        );
      }

      // Return URLs of uploaded file and thumbnails (if any)
      const url = getSignedUrl(`uploads/${filename}${file.originalname}`);
      return { url, thumbnailUrls };
    } catch (err) {
      console.error(err);
      throw new Error('Error uploading file to S3');
    }
  }

  static async deleteFile(key: string): Promise<void> {
    try {
      await deleteFromS3(key);
    } catch (err) {
      console.error(err);
      throw new Error('Error deleting file from S3');
    }
  }
}
