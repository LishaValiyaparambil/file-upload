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
  cloudConfig: string;
}

export interface IUploadOptions {
  resize?: {
    width: number;
    height: number;
  };
  thumbnail?: {
  thumbnailSize: number[];
  thumbnailFolder: string;
  }
}

export interface IResultData {
  flePath?: string;
  thumbnailFilePath?: any;
}

export interface IServiceConfigData {
    KeyId: string;
    secretKey: string;
    // storageLocation: string;
}

export interface IFileUploadData {
    file: IUploadedFile,
    config: object,
    storageLocation : string,
    options?: IUploadOptions,
    serviceType? : string
}


