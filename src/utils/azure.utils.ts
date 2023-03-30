import * as Azure from 'azure-storage';
const { Readable } = require('stream');


export const uploadToBlob = async (
  file: Buffer,
  key: string,
  contentType: number
): Promise<string> => {
  const blobService = Azure.createBlobService(
    `${process.env.accountName}`,
    `${process.env.accountKey}`,
  );

    const result = await new Promise<void>((resolve, reject) => {
        blobService.createBlockBlobFromStream(
            process.env.containerName!,
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

};


