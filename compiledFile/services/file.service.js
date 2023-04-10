"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const aws_utils_1 = require("../utils/aws.utils");
const azure_utils_1 = require("../utils/azure.utils");
const sharp = require("sharp");
// Function for file upload along with resizing and thumbnail creation
class FileService {
    static async uploadFile(file, options, serviceType, config) {
        var _a, _b;
        try {
            const fileName = `${Date.now()}-${file.originalName}`;
            const filePathList = {};
            // Checking if the service type provided is AWS or Azure
            if (serviceType) {
                if (!(['AWS', 'AZURE'].includes(serviceType)))
                    return { error: 'Invalid service' };
            }
            if (!config) {
                return { error: 'Invalid login credentials' };
            }
            else {
                // Checking if width and given , if yes resizing the file and uploading it to cloud
                if (((_a = options === null || options === void 0 ? void 0 : options.resize) === null || _a === void 0 ? void 0 : _a.height) && ((_b = options === null || options === void 0 ? void 0 : options.resize) === null || _b === void 0 ? void 0 : _b.width)) {
                    const resizedFile = await sharp(file.buffer)
                        .resize(options.resize.width, options.resize.height)
                        .toBuffer();
                    if (serviceType === 'AWS') {
                        let resizedFlePath = await (0, aws_utils_1.uploadToS3)(resizedFile, `uploads/${fileName}`, file.mimeType, config);
                        filePathList.resizedFlePath = resizedFlePath;
                    }
                    else if (serviceType === 'AZURE') {
                        let resizedFlePath = await (0, azure_utils_1.uploadToBlob)(resizedFile, `uploads/${fileName}`, file.size, config);
                        filePathList.resizedFlePath = resizedFlePath;
                    }
                }
                // If width and height is not given then will upload the file to cloud as it is
                else {
                    if (serviceType === 'AWS') {
                        let flePath = await (0, aws_utils_1.uploadToS3)(file.buffer, `uploads/${fileName}`, file.mimeType, config);
                        filePathList.flePath = flePath;
                    }
                    else if (serviceType === 'AZURE') {
                        let flePath = await (0, azure_utils_1.uploadToBlob)(file.buffer, `uploads/${fileName}`, file.size, config);
                        filePathList.flePath = flePath;
                    }
                }
                // if thumbnail size is given, the thumbnail is created and uploading it into thumbnail folder
                if (options === null || options === void 0 ? void 0 : options.thumbnailSize) {
                    let thumbnailFilePath = await Promise.all(options.thumbnailSize.map(async (size) => {
                        const thumbnail = await sharp(file.buffer).resize(size).toBuffer();
                        const thumbnailKey = options.thumbnailFolder
                            ? `${options.thumbnailFolder}/${size}-${fileName}`
                            : `uploads/${size}-${fileName}`;
                        if (serviceType === 'AWS') {
                            return (0, aws_utils_1.uploadToS3)(thumbnail, thumbnailKey, file.mimeType, config);
                        }
                        else if (serviceType === 'AZURE') {
                            return (0, azure_utils_1.uploadToBlob)(thumbnail, thumbnailKey, file.size, config);
                        }
                    }));
                    filePathList.thumbnailFilePath = thumbnailFilePath;
                }
            }
            return filePathList;
        }
        catch (err) {
            throw (err);
        }
    }
}
exports.FileService = FileService;
