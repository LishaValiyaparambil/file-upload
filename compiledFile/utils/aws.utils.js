"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const aws_sdk_1 = require("aws-sdk");
const uploadToS3 = async (file, key, contentType, config) => {
    try {
        // Initializing the Amazon s3 variable
        const s3 = new aws_sdk_1.S3({
            accessKeyId: config === null || config === void 0 ? void 0 : config.account,
            secretAccessKey: config === null || config === void 0 ? void 0 : config.secret,
        });
        // Uploading file to the s3 bucket
        const result = await s3
            .upload({
            Bucket: `${config === null || config === void 0 ? void 0 : config.location}`,
            Key: key,
            Body: file,
            ContentType: contentType,
            ACL: 'public-read',
        })
            .promise();
        return result.Location;
    }
    catch (error) {
        throw error;
    }
};
exports.uploadToS3 = uploadToS3;