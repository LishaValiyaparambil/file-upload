import { uploadToS3 } from '../utils/aws.utils';
import { IUploadedFile, IUploadOptions, IResultData, IServiceConfigData } from '../types/file.interface';
import { uploadToBlob } from '../utils/azure.utils'
import { resizeFile, createThumbnail } from '../helper/helper'


// Function for file upload along with resizing and thumbnail creation
export class FileService {
  static async uploadFile(
    file: IUploadedFile,
    config: IServiceConfigData,
    options?: IUploadOptions,
    serviceType?: string,
  ) {
    try {
      const fileName = `${Date.now()}-${file.originalName}`
      const filePathList: IResultData = {}

      // Checking if the service type provided is AWS or Azure
      switch (serviceType) {
        case 'AWS':
          var resizedFleS3Path = options?.resize?.height ? 
          await resizeFile(file,
            options,
            config,
            fileName,
            serviceType) :
            await uploadToS3(file.buffer,
              `uploads/${fileName}`,
              file.mimeType,
              config)
          const thumbnailPath = options?.thumbnailSize ? 
          await createThumbnail(file,
            options,
            config,
            fileName,
            serviceType) : []
          filePathList.flePath = resizedFleS3Path;
          filePathList.thumbnailFilePath = thumbnailPath;
          return filePathList

        case 'AZURE':
          const resizedFlePath = options?.resize?.height ? await resizeFile(file,
            options,
            config,
            fileName,
            serviceType) : 
            await uploadToBlob(file.buffer,
              `uploads/${fileName}`,
              file.size,
              config)

          const thumbnailBlobPath = options?.thumbnailSize ? await createThumbnail(file,
            options,
            config,
            fileName,
            serviceType) : []
          filePathList.flePath = resizedFlePath;
          filePathList.thumbnailFilePath = thumbnailBlobPath;
          return filePathList
        default:
          return { error: 'Invalid service' }
      }
    } catch (err) {
      throw (err);
    }
  }

}
