import { IFileUploadData, IResultData, IServiceConfigData } from '../types/file.interface';
import { AzureService, AWSService } from '../services'


interface FileUploadMethod {
  uploadToCloud(): Promise<IResultData>
  // cloudConfig(): Promise<string>
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

interface cloudConfigMethod {
  cloudConfigMethod(): Promise<any>
}

export class CloudConfigStrategy {
  strategy: cloudConfigMethod
  constructor(strategy: cloudConfigMethod) {
    this.strategy = strategy
  }
  async cloudConfigMethod(): Promise<any> {
    return this.strategy.cloudConfigMethod()
  }
}

export class AzureCloudConfig implements cloudConfigMethod {
  uploadObject: IServiceConfigData
  azureObject = new AzureService()
  constructor(uploadObject: IServiceConfigData) {
    this.uploadObject = uploadObject
  }
  async cloudConfigMethod(): Promise<any> {
    const result = await this.azureObject.initializeBlob(this.uploadObject)
    return result
  }
}

export class AwsCloudConfig implements cloudConfigMethod {
  uploadObject: IServiceConfigData
  azureObject = new AWSService()
  constructor(uploadObject: IServiceConfigData) {
    this.uploadObject = uploadObject
  }
  async cloudConfigMethod(): Promise<any> {
    const result = await this.azureObject.initializeS3(this.uploadObject)
    return result
  }
}

export { AWSService };
