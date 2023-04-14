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
        cloudConfig
      }
        = inputData
      const options = {
        resize: { width, height },
        thumbnailSize: thumbnailSize,
        thumbnailFolder: 'thumbnails'
      };

      // calling the file upload function for both AWS and Azure
      return await FileService.uploadFile(file, cloudConfig, options, serviceType);
    } catch (err) {
      throw (err)
    }
  }

}
