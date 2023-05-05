"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudConfigStrategy = exports.UploadStrategy = void 0;
var file_controller_1 = require("./src/controllers/file.controller");
Object.defineProperty(exports, "UploadStrategy", { enumerable: true, get: function () { return file_controller_1.UploadStrategy; } });
Object.defineProperty(exports, "CloudConfigStrategy", { enumerable: true, get: function () { return file_controller_1.CloudConfigStrategy; } });
//import { UploadStrategy, AzureUploader, AWSUploader , AwsCloudConfig, CloudConfigStrategy} from './src/controllers/file.controller'
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
// const awsS3Config = new AwsCloudConfig({
//     KeyId: 'account key',
//     secretKey: 'secret key',
//     // storageLocation: 'location of the bucket'
// })
// const configurationResult = new CloudConfigStrategy(awsS3Config)
// const configDeclaration =  configurationResult.cloudConfigMethod()
// const awsUploadFunction = new AWSUploader({
// file: {
//     originalName: 'string',
//     mimeType: 'image',
//     buffer: new Buffer('test'),
//     size: 23,
// },
// config : configDeclaration,
// storageLocation : 'test'
// })
// const uploadStrategy = new UploadStrategy(awsUploadFunction)
// const result = await uploadStrategy.uploadToCloud()
// const awsUploadFunction = new AWSUploader(input)
// //const azureUploadFunction = new AzureUploader(input)
// const uploadStrategy = new UploadStrategy(awsUploadFunction)
// uploadStrategy.uploadToCloud()
