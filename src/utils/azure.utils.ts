import * as Azure from 'azure-storage';
const { Readable } = require('stream');
import { IServiceConfigData } from '../types/file.interface';

export const uploadToBlob = async (
  file: Buffer,
  key: string,
  contentType: number,
  config: IServiceConfigData
): Promise<string> => {
  try {
    // Initializing the Azure Blob variable
    const blobService = Azure.createBlobService(
      config.cloudConfig.KeyId,
      config.cloudConfig.secretKey
    );
    // Uploading file to the Azure blob    accountName? : string;
    const result = await new Promise<void>((resolve, reject) => {
      blobService.createBlockBlobFromStream(
       config.cloudConfig.storageLocation,
        key,
        Readable.from(file),
        contentType,
        {},
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
    const fileUrl = `https://${process.env.accountName}.blob.core.windows.net/${process.env.containerName}/${key}`
    return fileUrl;
  }
  catch (error) {
    throw error
  }
};


