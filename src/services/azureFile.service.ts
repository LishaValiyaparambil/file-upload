
import * as Azure from 'azure-storage';
import { IResultData, IFileUploadData , IServiceConfigData} from '../types/file.interface';
import { uploadToBlob } from '../utils/azure.utils'
import { resizeFile, createThumbnail } from '../helper/helper'

export default class AzureService {
  async azureUploadFunction(iFileUploadData: IFileUploadData) : Promise<IResultData> {
   
    const fileName = `${Date.now()}-${iFileUploadData.file.originalName}`
    const filePathList: IResultData = {}
    const resizedFlePath = iFileUploadData.options?.resize?.height ? await resizeFile(iFileUploadData.file,
      iFileUploadData.options,
      iFileUploadData.config,
      fileName,
      'AZURE',
      iFileUploadData.storageLocation) :
      await uploadToBlob(iFileUploadData.file.buffer,
        `uploads/${fileName}`,
        iFileUploadData.file.size,
        iFileUploadData.config,
        iFileUploadData.storageLocation)

    const thumbnailBlobPath = iFileUploadData.options?.thumbnail?.thumbnailSize ? await createThumbnail(iFileUploadData.file,
      iFileUploadData.options,
      iFileUploadData.config,
      fileName,
      'AZURE',
      iFileUploadData.storageLocation) : []
    filePathList.flePath = resizedFlePath;
    filePathList.thumbnailFilePath = thumbnailBlobPath;
    return filePathList
  }
  async initializeBlob(iFileUploadData: IServiceConfigData): Promise<object>  {
    try {
      // Initializing the Amazon s3 variable
      const blobService = Azure.createBlobService(
        iFileUploadData.KeyId,
        iFileUploadData.secretKey
      );
      
      return blobService;
    }
    catch (error) {
      throw error
    }
   }
}