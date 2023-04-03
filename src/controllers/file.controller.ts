import { IUploadInputData } from '../types/file.interface';
import { FileService } from '../services/file.service';

export class FileUploader {
  async uploadFileToCloud(inputData : IUploadInputData) {
    try {
      const {
        file,
        serviceType = 'AWS',
        thumbnailSize,
        width,
        height
      }
      = inputData
      const options = {
        resize: { width, height },
        thumbnailSize: thumbnailSize,
        thumbnailFolder: 'thumbnails'
      };
      return await FileService.uploadFile(file, options, serviceType);
    } catch (err) {
      throw(err)
    }
  }

}
