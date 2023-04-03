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
    serviceType?: string
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