export { UploadStrategy , CloudConfigStrategy } from './src/controllers/file.controller';

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