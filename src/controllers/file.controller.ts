import { IUploadInputData } from '../types/file.interface';
import { FileService } from '../services/file.service';

//Method which calls the file upload function
export class FileUploader {
  async uploadFileToCloud(inputData: IUploadInputData) {
    try {
      // Input data from the user
      const {
        file,
        serviceType = 'AWS',
        thumbnailSize,
        width,
        height,
        s3Config,
        blobConfig,
      }
        = inputData
      const options = {
        resize: { width, height },
        thumbnailSize: thumbnailSize,
        thumbnailFolder: 'thumbnails'
      };
      let config;
      if (serviceType === 'AWS') {
        if(s3Config){
          config = {
            account: s3Config.accessKeyId,
            secret: `${s3Config.secretAccessKey}`,
            location: s3Config.bucketName,
        }
        }
        
      }
      else if (serviceType === 'AZURE') {
        if(blobConfig){
          config = {
            account: blobConfig.accountName,
            secret: blobConfig.accountKey,
            location: blobConfig.containerName
        }
        }
      }
      // calling the file upload function for both AWS and Azure
      return await FileService.uploadFile(file, options, serviceType, config);
    } catch (err) {
      throw (err)
    }
  }

}
