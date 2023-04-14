import { S3 } from 'aws-sdk';
import { IServiceConfigData } from '../types/file.interface';
export const uploadToS3 = async (
  file: Buffer,
  key: string,
  contentType: string,
  config: IServiceConfigData
): Promise<string> => {
  try {
    // Initializing the Amazon s3 variable
    const s3 = new S3({
      accessKeyId: config.KeyId,
      secretAccessKey: config.secretKey,
    });
    // Uploading file to the s3 bucket
    const result = await s3
      .upload({
        Bucket: `${config.storageLocation}`,
        Key: key,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read',
      })
      .promise();
    return result.Location;
  }
  catch (error) {
    throw error
  }
};

