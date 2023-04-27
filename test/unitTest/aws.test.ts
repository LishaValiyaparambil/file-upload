import 'jest';
import { AWSUploader, UploadStrategy, AzureUploader } from '../../src/controllers/file.controller'

describe('FileUploader', () => {

    it('file upload to aws s3 bucket without resize and thumbnail', async () => {
        const awsUploadFunction = new AWSUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23,
            },
            config: {
                KeyId: 'account key',
                secretKey: 'secret key',
                storageLocation: 'location of the bucket'
            }
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
        const awsUploadFunction = new AWSUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23,
            },
            config: {
                KeyId: 'account key',
                secretKey: 'secret key',
                storageLocation: 'location of the bucket'
            },
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
        const awsUploadFunction = new AWSUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23,
            },
            config: {
                KeyId: 'account key',
                secretKey: 'secret key',
                storageLocation: 'location of the bucket'
            },
            options: {
                thumbnail :{
                    thumbnailSize: [200, 400],
                    thumbnailFolder : 'thumbFolder'
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

        const azureUploadFunction = new AzureUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23,
            },
            serviceType: 'AZURE',
            config: {
                KeyId: 'account key',
                secretKey: 'secret key',
                storageLocation: 'location of the bucket'
            },
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

        const azureUploadFunction = new AzureUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23,
            },
            serviceType: 'AZURE',
            config: {
                KeyId: 'account key',
                secretKey: 'secret key',
                storageLocation: 'location of the bucket'
            },
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
        const azureUploadFunction = new AzureUploader({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23,
            },
            serviceType: 'AZURE',
            config: {
                KeyId: 'account key',
                secretKey: 'secret key',
                storageLocation: 'location of the bucket'
            },
            options: {
                thumbnail :{
                    thumbnailSize: [200, 400],
                    thumbnailFolder : 'thumbFolder'
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