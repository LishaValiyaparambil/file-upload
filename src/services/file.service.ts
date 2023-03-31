import { uploadToS3 } from '../utils/aws.utils';
import { IUploadedFile, IUploadOptions } from '../types/file.interface';
import { uploadToBlob } from '../utils/azure.utils'
import * as sharp from 'sharp';

export class FileService {
  static async uploadFile(file: IUploadedFile, options?: IUploadOptions, serviceType? : string): Promise<void> {
    try {
      const filename = `${Date.now()}-${file.originalname}`

      // Resize the image if requested
      if (options?.resize?.height && options?.resize?.width) {
        console.log("inside if")
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
        console.log("outside if")
        if(serviceType === 'AWS'){
          await uploadToS3(file.buffer, `uploads/${filename}`, file.mimetype);
        }
        else if(serviceType === 'AZURE'){
          await uploadToBlob(file.buffer, `uploads/${filename}`, file.size);
        }
      }

      if (options?.thumbnailSize) {
        await Promise.all(
          options.thumbnailSize.map(async (size) => {
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
      console.log("conole.logged", err)
      throw(err);
    }
  }

}
