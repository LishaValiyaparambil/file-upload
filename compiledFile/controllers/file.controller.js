"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = void 0;
const file_service_1 = require("../services/file.service");
//Method which calls the file upload function
class FileUploader {
    async uploadFileToCloud(inputData) {
        try {
            // Input data from the user
            const { file, serviceType = 'AWS', thumbnailSize, width, height, s3Config, blobConfig, } = inputData;
            const options = {
                resize: { width, height },
                thumbnailSize: thumbnailSize,
                thumbnailFolder: 'thumbnails'
            };
            let config;
            if (serviceType === 'AWS') {
                if (s3Config) {
                    config = {
                        account: s3Config.accessKeyId,
                        secret: `${s3Config.secretAccessKey}`,
                        location: s3Config.bucketName,
                    };
                }
            }
            else if (serviceType === 'AZURE') {
                if (blobConfig) {
                    config = {
                        account: blobConfig.accountName,
                        secret: blobConfig.accountKey,
                        location: blobConfig.containerName
                    };
                }
            }
            // calling the file upload function for both AWS and Azure
            return await file_service_1.FileService.uploadFile(file, options, serviceType, config);
        }
        catch (err) {
            throw (err);
        }
    }
}
exports.FileUploader = FileUploader;
