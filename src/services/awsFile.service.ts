import { uploadToS3 } from '../utils/aws.utils';
import {  IResultData, IFileUploadData } from '../types/file.interface';
import { resizeFile, createThumbnail } from '../helper/helper'


export default class AWSService {
  async s3UploadFunction(iFileUploadData: IFileUploadData): Promise<IResultData>  {
    
    const fileName = `${Date.now()}-${iFileUploadData.file.originalName}`
    const filePathList: IResultData = {}
    let resizedFleS3Path = iFileUploadData.options?.resize?.height ?
      await resizeFile(iFileUploadData.file,
        iFileUploadData.options,
        iFileUploadData.config,
        fileName,
        'AWS') :
      await uploadToS3(iFileUploadData.file.buffer,
        `uploads/${fileName}`,
        iFileUploadData.file.mimeType,
        iFileUploadData.config)
    const thumbnailPath = iFileUploadData.options?.thumbnailSize ?
      await createThumbnail(iFileUploadData.file,
        iFileUploadData.options,
        iFileUploadData.config,
        fileName,
        'AWS') : []
    filePathList.flePath = resizedFleS3Path;
    filePathList.thumbnailFilePath = thumbnailPath;
    return filePathList
   }
}

