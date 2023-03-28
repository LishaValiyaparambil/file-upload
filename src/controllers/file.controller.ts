import { Request, Response } from 'express';
import { serviceOptions, UploadedFile } from '../types/file.interface';
import { FileService } from '../services/aws.service';

export class FileController {
  static async upload(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file as UploadedFile;
      let serviceType = req.body.serviceType 
      const options = {
        resize: { width: 800, height: 600 },
        thumbnailSizes: [200, 400, 600],
        thumbnailFolder: 'thumbnails',
        
      };
      await FileService.uploadFile(file, options, serviceType);
      res.status(500).send('uploading file');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error uploading file');
    }
  }

}
