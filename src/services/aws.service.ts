import { uploadToS3 } from '../utils/aws.utils';
import { UploadedFile, UploadOptions, serviceOptions } from '../types/file.interface';
import { uploadToBlob } from '../utils/azure.utils'
import sharp from 'sharp';

export class FileService {
  static async uploadFile(file: UploadedFile, options?: UploadOptions, serviceType? : 'AWS'): Promise<void> {
    try {
      const filename = `${Date.now()}-${file.originalname}`

      // Resize the image if requested
      if (options?.resize) {
        const resizedImage = await sharp(file.buffer)
          .resize(options.resize.width, options.resize.height)
          .toBuffer();
        if(serviceType === 'AWS'){
          await uploadToS3(resizedImage, `uploads/${filename}`, file.mimetype);
        }
        else if(serviceType === 'AZURE'){
          await uploadToBlob(resizedImage, `uploads/${filename}`, file.size);
        }
      } else {
        if(serviceType === 'AWS'){
          await uploadToS3(file.buffer, `uploads/${filename}`, file.mimetype);
        }
        else if(serviceType === 'AZURE'){
          await uploadToBlob(file.buffer, `uploads/${filename}`, file.size);
        }        
      }

      // Generate thumbnails if requested
      let thumbnailUrls: string[] | undefined;
      if (options?.thumbnailSizes) {
        let thumbnailUrls = await Promise.all(
          options.thumbnailSizes.map(async (size) => {
            const thumbnail = await sharp(file.buffer).resize(size).toBuffer();
            const thumbnailKey = options.thumbnailFolder
              ? `${options.thumbnailFolder}/${size}-${filename}`
              : `uploads/${size}-${filename}`;
              if(serviceType === 'AWS'){
                return uploadToS3(thumbnail, thumbnailKey, file.mimetype);
              }
              else if(serviceType === 'AZURE'){
                return uploadToBlob(thumbnail, thumbnailKey, file.size);
              }
          })
        );
      }

    } catch (err) {
      console.error(err);
      throw new Error('Error uploading file to S3');
    }
  }

}
