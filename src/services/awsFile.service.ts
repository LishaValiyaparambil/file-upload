import { S3 } from 'aws-sdk';
import { uploadToS3 } from '../utils/aws.utils';
import {  IResultData, IFileUploadData, IServiceConfigData } from '../types/file.interface';
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
        'AWS',
        iFileUploadData.storageLocation) :
      await uploadToS3(iFileUploadData.file.buffer,
        `uploads/${fileName}`,
        iFileUploadData.file.mimeType,
        iFileUploadData.config,
        iFileUploadData.storageLocation)
    const thumbnailPath = iFileUploadData.options?.thumbnail?.thumbnailSize ?
      await createThumbnail(iFileUploadData.file,
        iFileUploadData.options,
        iFileUploadData.config,
        fileName,
        'AWS',
        iFileUploadData.storageLocation) : []
    filePathList.flePath = resizedFleS3Path;
    filePathList.thumbnailFilePath = thumbnailPath;
    return filePathList
   }
   async initializeS3(iFileUploadData: IServiceConfigData): Promise<object>  {
    try {
      //Initializing the Amazon s3 variable
      const s3 = new S3({
        accessKeyId: iFileUploadData.KeyId,
        secretAccessKey: iFileUploadData.secretKey,
      });
      
      return s3;
    }
    catch (error) {
      throw error
    }
   }
}

