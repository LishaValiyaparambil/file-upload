import { S3 } from 'aws-sdk';


export const uploadToS3 = async (
  file: Buffer,
  key: string,
  contentType: string
): Promise<string> => {
  try {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const result = await s3
      .upload({
        Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
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

