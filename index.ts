export { UploadStrategy } from './src/controllers/file.controller';

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