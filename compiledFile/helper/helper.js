"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThumbnail = exports.resizeFile = void 0;
const sharp = require("sharp");
const aws_utils_1 = require("../utils/aws.utils");
const azure_utils_1 = require("../utils/azure.utils");
const resizeFile = async (file, options, config, fileName, serviceType) => {
    var _a, _b;
    const resizedFile = await sharp(file.buffer)
        .resize((_a = options === null || options === void 0 ? void 0 : options.resize) === null || _a === void 0 ? void 0 : _a.width, (_b = options === null || options === void 0 ? void 0 : options.resize) === null || _b === void 0 ? void 0 : _b.height)
        .toBuffer();
    let uploadedPath = serviceType === 'AWS' ?
        await (0, aws_utils_1.uploadToS3)(resizedFile, `uploads/${fileName}`, file.mimeType, config) :
        await (0, azure_utils_1.uploadToBlob)(resizedFile, `uploads/${fileName}`, file.size, config);
    return uploadedPath;
};
exports.resizeFile = resizeFile;
const createThumbnail = async (file, options, config, fileName, serviceType) => {
    let thumbnailSize = (options === null || options === void 0 ? void 0 : options.thumbnailSize) ? options === null || options === void 0 ? void 0 : options.thumbnailSize : [];
    let thumbnailFilePath = await Promise.all(thumbnailSize.map(async (size) => {
        const thumbnail = await sharp(file.buffer).resize(size).toBuffer();
        const thumbnailKey = options.thumbnailFolder
            ? `${options.thumbnailFolder}/${size}-${fileName}`
            : `uploads/${size}-${fileName}`;
        let uploadedPath = serviceType === 'AWS' ?
            await (0, aws_utils_1.uploadToS3)(thumbnail, thumbnailKey, file.mimeType, config) :
            await (0, azure_utils_1.uploadToBlob)(thumbnail, thumbnailKey, file.size, config);
        return uploadedPath;
    }));
    return `${thumbnailFilePath}`;
};
exports.createThumbnail = createThumbnail;
