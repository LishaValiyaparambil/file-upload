
import { IResultData, IFileUploadData } from '../types/file.interface';
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
      'AZURE') :
      await uploadToBlob(iFileUploadData.file.buffer,
        `uploads/${fileName}`,
        iFileUploadData.file.size,
        iFileUploadData.config)

    const thumbnailBlobPath = iFileUploadData.options?.thumbnailSize ? await createThumbnail(iFileUploadData.file,
      iFileUploadData.options,
      iFileUploadData.config,
      fileName,
      'AZURE') : []
    filePathList.flePath = resizedFlePath;
    filePathList.thumbnailFilePath = thumbnailBlobPath;
    return filePathList
  }
}