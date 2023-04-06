import * as Azure from 'azure-storage';
const { Readable } = require('stream');
import { IConfig } from '../types/file.interface';

export const uploadToBlob = async (
  file: Buffer,
  key: string,
  contentType: number,
  config: IConfig
): Promise<string> => {
  try {
    // Initializing the Azure Blob variable
    const blobService = Azure.createBlobService(
      config.account,
      config.secret
    );
    // Uploading file to the Azure blob    accountName? : string;
    const result = await new Promise<void>((resolve, reject) => {
      blobService.createBlockBlobFromStream(
       config.location,
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


