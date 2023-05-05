import 'jest';
import { AWSUploader, UploadStrategy, AzureUploader, AwsCloudConfig, CloudConfigStrategy, AzureCloudConfig } from '../../src/controllers/file.controller'

describe('FileUploader', () => {

    it('file upload to aws s3 bucket without resize and thumbnail', async () => {
        const awsS3Config = new AwsCloudConfig({
            KeyId: 'account key',
            secretKey: 'secret key',
        })
        const configurationResult = new CloudConfigStrategy(awsS3Config)
        const configDeclaration = configurationResult.cloudConfigMethod()
        const awsUploadFunction = new AWSUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23,
            },
            config: configDeclaration,
            storageLocation: 'bucket name'
        })
        const uploadStrategy = new UploadStrategy(awsUploadFunction)
        const result = uploadStrategy.uploadToCloud()
        expect(result).toStrictEqual(
            {
                flePath: 'name of the uploaded file'
            }
        );
    });
    it('file upload to aws s3 bucket with resize', async () => {
        const awsS3Config = new AwsCloudConfig({
            KeyId: 'account key',
            secretKey: 'secret key'
        })
        const configurationResult = new CloudConfigStrategy(awsS3Config)
        const configDeclaration = configurationResult.cloudConfigMethod()
        const awsUploadFunction = new AWSUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23,
            },
            config: configDeclaration,
            storageLocation: 'bucket name',
            options: {
                resize: {
                    width: 23,
                    height: 33
                }
            }
        })

        const uploadStrategy = new UploadStrategy(awsUploadFunction)
        const result = uploadStrategy.uploadToCloud()
        expect(result).toStrictEqual(
            {
                resizedFlePath: 'name of the uploaded file which is resized'
            }
        );
    });
    it('file upload to aws s3 bucket with thumbnails', async () => {
        const awsS3Config = new AwsCloudConfig({
            KeyId: 'account key',
            secretKey: 'secret key'
        })
        const configurationResult = new CloudConfigStrategy(awsS3Config)
        const configDeclaration = configurationResult.cloudConfigMethod()
        const awsUploadFunction = new AWSUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23,
            },
            config: configDeclaration,
            storageLocation: 'bucket name',
            options: {
                thumbnail: {
                    thumbnailSize: [200, 400],
                    thumbnailFolder: 'thumbFolder'
                }
            }
        })

        const uploadStrategy = new UploadStrategy(awsUploadFunction)
        const result = uploadStrategy.uploadToCloud()
        expect(result).toStrictEqual(
            {
                flePath: 'name of the uploaded file',
                thumbnailFilePath: 'names of the uploaded file thumbnails'
            }
        );
    });

    it('file upload to azure blob without resize and thumbnail', async () => {
        const azureBlobConfig = new AzureCloudConfig({
            KeyId: 'account key',
            secretKey: 'secret key',
        })
        const configurationResult = new CloudConfigStrategy(azureBlobConfig)
        const configDeclaration = configurationResult.cloudConfigMethod()

        const azureUploadFunction = new AzureUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23
            },
            storageLocation: 'container name',
            config: configDeclaration,
            serviceType: 'AZURE',
        })
        const uploadStrategy = new UploadStrategy(azureUploadFunction)
        const result = uploadStrategy.uploadToCloud()
        expect(result).toStrictEqual(
            {
                flePath: 'name of the uploaded file'
            }
        );
    });
    it('file upload to azure blob with resize', async () => {
        const azureBlobConfig = new AzureCloudConfig({
            KeyId: 'account key',
            secretKey: 'secret key',
        })
        const configurationResult = new CloudConfigStrategy(azureBlobConfig)
        const configDeclaration = configurationResult.cloudConfigMethod()

        const azureUploadFunction = new AzureUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23
            },
            storageLocation: 'container name',
            config: configDeclaration,
            serviceType: 'AZURE',
            options: {
                resize: {
                    width: 23,
                    height: 33
                }
            }
        })
        const uploadStrategy = new UploadStrategy(azureUploadFunction)
        const result = uploadStrategy.uploadToCloud()
        expect(result).toStrictEqual(
            {
                resizedFlePath: 'name of the uploaded file which is resized'
            }
        );
    });
    it('file upload to azure blob with thumbnails', async () => {
        const azureBlobConfig = new AzureCloudConfig({
            KeyId: 'account key',
            secretKey: 'secret key',
        })
        const configurationResult = new CloudConfigStrategy(azureBlobConfig)
        const configDeclaration = configurationResult.cloudConfigMethod()

        const azureUploadFunction = new AzureUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23
            },
            storageLocation: 'container name',
            config: configDeclaration,
            serviceType: 'AZURE',
            options: {
                thumbnail: {
                    thumbnailSize: [200, 400],
                    thumbnailFolder: 'thumbFolder'
                }

            }
        })
        const uploadStrategy = new UploadStrategy(azureUploadFunction)
        const result = uploadStrategy.uploadToCloud()
        expect(result).toStrictEqual(
            {
                flePath: 'name of the uploaded file',
                thumbnailFilePath: 'names of the uploaded file thumbnails'
            }
        );
    });
});