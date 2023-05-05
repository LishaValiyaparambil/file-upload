import * as Azure from 'azure-storage';
const { Readable } = require('stream');
import { IServiceConfigData } from '../types/file.interface';

export const uploadToBlob = async (
  file: Buffer,
  key: string,
  contentType: number,
  config: any,
  storageLocation : string
): Promise<string> => {
  try {
    // Uploading file to the Azure blob    accountName? : string;
    const result = await new Promise<void>((resolve, reject) => {
      config.createBlockBlobFromStream(
        storageLocation,
        key,
        Readable.from(file),
        contentType,
        {},
        (error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
    return('true')
    
  }
  catch (error) {
    throw error
  }
};






