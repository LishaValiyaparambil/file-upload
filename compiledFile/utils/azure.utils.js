"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToBlob = void 0;
const Azure = require("azure-storage");
const { Readable } = require('stream');
const uploadToBlob = async (file, key, contentType, config) => {
    try {
        // Initializing the Azure Blob variable
        const blobService = Azure.createBlobService(config.account, config.secret);
        // Uploading file to the Azure blob    accountName? : string;
        const result = await new Promise((resolve, reject) => {
            blobService.createBlockBlobFromStream(config.location, key, Readable.from(file), contentType, {}, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
        const fileUrl = `https://${process.env.accountName}.blob.core.windows.net/${process.env.containerName}/${key}`;
        return fileUrl;
    }
    catch (error) {
        throw error;
    }
};
exports.uploadToBlob = uploadToBlob;
