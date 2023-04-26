"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadStrategy = void 0;
var file_controller_1 = require("./src/controllers/file.controller");
Object.defineProperty(exports, "UploadStrategy", { enumerable: true, get: function () { return file_controller_1.UploadStrategy; } });
// import { UploadStrategy, AzureUploader, AWSUploader } from './src/controllers/file.controller'
// const input = {
//     file: {
//         originalName: 'string',
//         mimeType: 'image',
//         buffer: new Buffer('test'),
//         size: 23,
//     },
//     config: {
//         KeyId: 'account key',
//         secretKey: 'secret key',
//         storageLocation: 'location of the bucket'
//     }
// }
// const awsUploadFunction = new AWSUploader(input)
// //const azureUploadFunction = new AzureUploader(input)
// const uploadStrategy = new UploadStrategy(awsUploadFunction)
// uploadStrategy.uploadToCloud()
