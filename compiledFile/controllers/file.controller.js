"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = void 0;
const file_service_1 = require("../services/file.service");
//Method which calls the file upload function
class FileUploader {
    async uploadFileToCloud(inputData) {
        try {
            // Input data from the user
            const { file, serviceType = 'AWS', thumbnailSize, width, height, cloudConfig } = inputData;
            const options = {
                resize: { width, height },
                thumbnailSize: thumbnailSize,
                thumbnailFolder: 'thumbnails'
            };
            // calling the file upload function for both AWS and Azure
            return await file_service_1.FileService.uploadFile(file, cloudConfig, options, serviceType);
        }
        catch (err) {
            throw (err);
        }
    }
}
exports.FileUploader = FileUploader;
