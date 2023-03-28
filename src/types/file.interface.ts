export interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }
  
  export interface UploadOptions {
    resize?: {
      width: number;
      height: number;
    };
    thumbnailSizes?: number[];
    thumbnailFolder?: string;
  }
  
  export interface UploadResult {
    url: string;
    thumbnailUrls?: string[];
  }
  