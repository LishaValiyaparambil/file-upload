"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const aws_utils_1 = require("../utils/aws.utils");
const azure_utils_1 = require("../utils/azure.utils");
const helper_1 = require("../helper/helper");
// Function for file upload along with resizing and thumbnail creation
class FileService {
    static async uploadFile(file, config, options, serviceType) {
        var _a, _b;
        try {
            const fileName = `${Date.now()}-${file.originalName}`;
            const filePathList = {};
            // Checking if the service type provided is AWS or Azure
            switch (serviceType) {
                case 'AWS':
                    var resizedFleS3Path = ((_a = options === null || options === void 0 ? void 0 : options.resize) === null || _a === void 0 ? void 0 : _a.height) ?
                        await (0, helper_1.resizeFile)(file, options, config, fileName, serviceType) :
                        await (0, aws_utils_1.uploadToS3)(file.buffer, `uploads/${fileName}`, file.mimeType, config);
                    const thumbnailPath = (options === null || options === void 0 ? void 0 : options.thumbnailSize) ?
                        await (0, helper_1.createThumbnail)(file, options, config, fileName, serviceType) : [];
                    filePathList.flePath = resizedFleS3Path;
                    filePathList.thumbnailFilePath = thumbnailPath;
                    return filePathList;
                case 'AZURE':
                    const resizedFlePath = ((_b = options === null || options === void 0 ? void 0 : options.resize) === null || _b === void 0 ? void 0 : _b.height) ? await (0, helper_1.resizeFile)(file, options, config, fileName, serviceType) :
                        await (0, azure_utils_1.uploadToBlob)(file.buffer, `uploads/${fileName}`, file.size, config);
                    const thumbnailBlobPath = (options === null || options === void 0 ? void 0 : options.thumbnailSize) ? await (0, helper_1.createThumbnail)(file, options, config, fileName, serviceType) : [];
                    filePathList.flePath = resizedFlePath;
                    filePathList.thumbnailFilePath = thumbnailBlobPath;
                    return filePathList;
                default:
                    return { error: 'Invalid service' };
            }
        }
        catch (err) {
            throw (err);
        }
    }
}
exports.FileService = FileService;
