export interface IUploadedFile {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }

  export interface IUploadInputData {
    file: IUploadedFile;
    width?: number;
    height?: number;
    thumbnailSize?: number[];
    serviceType: string
  }

  export interface IUploadOptions {
    resize?: {
      width?: number;
      height?: number;
    };
    thumbnailSize?: number[];
  }