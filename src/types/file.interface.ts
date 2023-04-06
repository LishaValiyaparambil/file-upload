export interface IUploadedFile {
  originalName: string;
    mimeType: string;
    buffer: Buffer;
    size: number;
  }

  export interface IUploadInputData {
    file: IUploadedFile;
    width?: number;
    height?: number;
    thumbnailSize?: number[];
    serviceType?: string;
    s3Config ? : {[key: string]: string};
    blobConfig? : {[key: string]: string}
  }

  export interface IUploadOptions {
    resize?: {
      width?: number;
      height?: number;
    };
    thumbnailSize?: number[];
    thumbnailFolder?: string;
  }

  export interface IResultData{
    resizedFlePath? : string;
    flePath? : string;
    thumbnailFilePath? : any;
  }

  export interface IServiceConfigData{
    s3Config ? :{
      accessKeyId : string;
      secretAccessKey : string;
      bucketName : string;
    }
    blobConfig ? :{
      accountName : string;
      accountKey : string;
      containerName : string;
    }
  }

  export interface IConfig {
      account : string;
      secret : string;
      location : string;
  }
