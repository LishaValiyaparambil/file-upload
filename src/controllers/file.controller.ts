import { IFileUploadData, IResultData } from '../types/file.interface';
import { AzureService, AWSService } from '../services'

interface FileUploadMethod {
  uploadToCloud(): Promise<IResultData>
}

export class UploadStrategy {
  strategy: FileUploadMethod
  constructor(strategy: FileUploadMethod) {
    this.strategy = strategy
  }
  async uploadToCloud(): Promise<IResultData> {
    return this.strategy.uploadToCloud()
  }
}

export class AWSUploader implements FileUploadMethod {
  uploadObject: IFileUploadData
  awsObject = new AWSService()
  constructor(uploadObject: IFileUploadData) {
    this.uploadObject = uploadObject
  }
  async uploadToCloud(): Promise<IResultData> {
    const result = await this.awsObject.s3UploadFunction(this.uploadObject)
    return result
  }
}

export class AzureUploader implements FileUploadMethod {
  uploadObject: IFileUploadData
  azureObject = new AzureService()
  constructor(uploadObject: IFileUploadData) {
    this.uploadObject = uploadObject
  }
  async uploadToCloud(): Promise<IResultData> {
    const result = await this.azureObject.azureUploadFunction(this.uploadObject)
    return result
  }
}

export { AWSService };
