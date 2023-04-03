import { uploadToS3 } from '../utils/aws.utils';
import { IUploadedFile, IUploadOptions, IResultData } from '../types/file.interface';
import { uploadToBlob } from '../utils/azure.utils'
import * as sharp from 'sharp';

export class FileService {
  static async uploadFile(file: IUploadedFile, options?: IUploadOptions, serviceType? : string) {
    try {
      const fileName = `${Date.now()}-${file.originalName}`
      const filePathList : IResultData = {}
      let resizedFlePath = 'test'
      let flePath = 'test 2'
      let thumbnailFilePath = 'test 3'
      
      if (options?.resize?.height && options?.resize?.width) {
        const resizedFile = await sharp(file.buffer)
          .resize(options.resize.width, options.resize.height)
          .toBuffer();
        if(serviceType === 'AWS'){
          let resizedFlePath = await uploadToS3(resizedFile, `uploads/${fileName}`, file.mimeType);
          filePathList.resizedFlePath = resizedFlePath;
        }
        else if(serviceType === 'AZURE'){
          let resizedFlePath = await uploadToBlob(resizedFile, `uploads/${fileName}`, file.size);
          filePathList.resizedFlePath = resizedFlePath;
        }
      } else {
        if(serviceType === 'AWS'){
          let flePath = await uploadToS3(file.buffer, `uploads/${fileName}`, file.mimeType);
          filePathList.flePath = flePath;
        }
        else if(serviceType === 'AZURE'){
          let flePath = await uploadToBlob(file.buffer, `uploads/${fileName}`, file.size);
          filePathList.flePath = flePath;
        }
      }

      if (options?.thumbnailSize) {
        let thumbnailFilePath = await Promise.all(
          options.thumbnailSize.map(async (size) => {
            const thumbnail = await sharp(file.buffer).resize(size).toBuffer();
            const thumbnailKey = options.thumbnailFolder
              ? `${options.thumbnailFolder}/${size}-${fileName}`
              : `uploads/${size}-${fileName}`;
              if(serviceType === 'AWS'){
                return uploadToS3(thumbnail, thumbnailKey, file.mimeType);
              }
              else if(serviceType === 'AZURE'){
                return uploadToBlob(thumbnail, thumbnailKey, file.size);
              }
          })
        );
        filePathList.thumbnailFilePath = thumbnailFilePath;
      }
      return filePathList;

    } catch (err) {
      throw(err);
    }
  }

}
