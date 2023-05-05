import { S3 } from 'aws-sdk';
import { IServiceConfigData } from '../types/file.interface';
export const uploadToS3 = async (
  file: Buffer,
  key: string,
  contentType: string,
  config: any,
  storageLocation : string
): Promise<string> => {
  try {
    // Uploading file to the s3 bucket
    const result = await config
      .upload({
        Bucket: `${storageLocation}`,
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





