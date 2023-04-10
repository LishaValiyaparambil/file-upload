import 'jest';
import { FileUploader } from '../../src/controllers/file.controller'

describe('FileUploader', () => {
    let fileUploader = new FileUploader();
    it('file upload to aws s3 bucket without resize and thumbnail', async () => {
        const result = await fileUploader.uploadFileToCloud({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23,
            },
            s3Config : {
                accessKeyId : '',
                secretAccessKey : '',
                bucketName : ''
            }
        });
        expect(result).toStrictEqual(
            {
                flePath: 'name of the uploaded file'
            }
        );
    });
    it('file upload to aws s3 bucket with resize', async () => {
        const result = await fileUploader.uploadFileToCloud({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23
            },
            s3Config : {
                accessKeyId : '',
                secretAccessKey : '',
                bucketName : ''
            },
            width: 23,
            height: 33
        });
        expect(result).toStrictEqual(
            {
                resizedFlePath: 'name of the uploaded file which is resized'
            }
        );
    });
    it('file upload to aws s3 bucket with thumbnails', async () => {
        const result = await fileUploader.uploadFileToCloud({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23
            },
            thumbnailSize: [200, 400],
            s3Config : {
                accessKeyId : '',
                secretAccessKey : '',
                bucketName : ''
            }
        });
        expect(result).toStrictEqual(
            {
                flePath: 'name of the uploaded file',
                thumbnailFilePath: 'names of the uploaded file thumbnails'
            }
        );
    });

    it('file upload to azure blob without resize and thumbnail', async () => {
        const result = await fileUploader.uploadFileToCloud(
            {
                file: {
                    originalName: 'string',
                    mimeType: 'image',
                    buffer: new Buffer('test'),
                    size: 23
                },
                serviceType: 'AZURE',
                blobConfig : {
                    accountName : '',
                    accountKey : '',
                    containerName : ''
                }
            }
        );
        expect(result).toStrictEqual(
            {
                flePath: 'name of the uploaded file'
            }
        );
    });
    it('file upload to azure blob with resize', async () => {
        const result = await fileUploader.uploadFileToCloud({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23
            },
            width: 23,
            height: 33,
            serviceType: 'AZURE',
            blobConfig : {
                accountName : '',
                accountKey : '',
                containerName : ''
            }
        });
        expect(result).toStrictEqual(
            {
                resizedFlePath: 'name of the uploaded file which is resized'
            }
        );
    });
    it('file upload to azure blob with thumbnails', async () => {
        const result = await fileUploader.uploadFileToCloud({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23
            },
            thumbnailSize: [200, 400],
            serviceType: 'AZURE',
            blobConfig : {
                accountName : '',
                accountKey : '',
                containerName : ''
            }
        });
        expect(result).toStrictEqual(
            {
                flePath: 'name of the uploaded file',
                thumbnailFilePath: 'names of the uploaded file thumbnails'
            }
        );
    });
    it('file upload to cloud with invalid service provider', async () => {
        const error = await fileUploader.uploadFileToCloud({
            file: {
                originalName: 'string',
                mimeType: 'image',
                buffer: new Buffer('test'),
                size: 23
            },
            serviceType: 'GCP',
            blobConfig : {
                accountName : '',
                accountKey : '',
                containerName : ''
            }
        });
        expect(error).toStrictEqual(
            {
                error : 'Invalid service'
            }
        );
    });

});