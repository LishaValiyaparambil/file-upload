import { uploadToS3 } from '../utils/aws.utils';
import { IUploadedFile, IUploadOptions, IResultData, IConfig } from '../types/file.interface';
import { uploadToBlob } from '../utils/azure.utils'
import * as sharp from 'sharp';

// Function for file upload along with resizing and thumbnail creation
export class FileService {
  static async uploadFile(file: IUploadedFile, options?: IUploadOptions, serviceType?: string, config?: IConfig) {
    try {
      const fileName = `${Date.now()}-${file.originalName}`
      const filePathList: IResultData = {}
      
      // Checking if the service type provided is AWS or Azure
      if (serviceType) {
        if (!(['AWS', 'AZURE'].includes(serviceType)))
          return { error: 'Invalid service' }
      }
      if (!config) {
        return { error: 'Invalid login credentials' }
      }
      else {

      // Checking if width and given , if yes resizing the file and uploading it to cloud
      if (options?.resize?.height && options?.resize?.width) {
        const resizedFile = await sharp(file.buffer)
          .resize(options.resize.width, options.resize.height)
          .toBuffer();
        if (serviceType === 'AWS') {
          let resizedFlePath = await uploadToS3(resizedFile, `uploads/${fileName}`, file.mimeType, config);
          filePathList.resizedFlePath = resizedFlePath;
        }
        else if (serviceType === 'AZURE') {
          let resizedFlePath = await uploadToBlob(resizedFile, `uploads/${fileName}`, file.size, config);
          filePathList.resizedFlePath = resizedFlePath;
        }
      }
      // If width and height is not given then will upload the file to cloud as it is
      else {
        if (serviceType === 'AWS') {
          let flePath = await uploadToS3(file.buffer, `uploads/${fileName}`, file.mimeType, config);
          filePathList.flePath = flePath;
        }
        else if (serviceType === 'AZURE') {
          let flePath = await uploadToBlob(file.buffer, `uploads/${fileName}`, file.size, config);
          filePathList.flePath = flePath;
        }
      }
      // if thumbnail size is given, the thumbnail is created and uploading it into thumbnail folder
      if (options?.thumbnailSize) {
        let thumbnailFilePath = await Promise.all(
          options.thumbnailSize.map(async (size) => {
            const thumbnail = await sharp(file.buffer).resize(size).toBuffer();
            const thumbnailKey = options.thumbnailFolder
              ? `${options.thumbnailFolder}/${size}-${fileName}`
              : `uploads/${size}-${fileName}`;
            if (serviceType === 'AWS') {
              return uploadToS3(thumbnail, thumbnailKey, file.mimeType, config);
            }
            else if (serviceType === 'AZURE') {
              return uploadToBlob(thumbnail, thumbnailKey, file.size, config);
            }
          })
        );
        filePathList.thumbnailFilePath = thumbnailFilePath;
      }
    }
      return filePathList;

    } catch (err) {
      throw (err);
    }
  }

}
