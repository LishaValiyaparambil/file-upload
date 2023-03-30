import { IUploadInputData } from '../types/file.interface';
import { FileService } from '../services/aws.service';

export class FileController {
  async upload(inputData : IUploadInputData): Promise<void> {
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
        thumbnailSizes: thumbnailSize,
        thumbnailFolder: 'thumbnails'
      };
      return FileService.uploadFile(file, options, serviceType);
    } catch (err) {
      throw(err)
    }
  }

}
