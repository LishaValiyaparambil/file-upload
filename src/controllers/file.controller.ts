import { Request, Response } from 'express';
import { UploadedFile } from '../types/file.interface';
import { FileService } from '../services/aws.service';

export class FileController {
  static async upload(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file as UploadedFile;
      const options = {
        resize: { width: 800, height: 600 },
        thumbnailSizes: [200, 400, 600],
        thumbnailFolder: 'thumbnails',
      };
      const result = await FileService.uploadFile(file, options);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error uploading file');
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.body;
      await FileService.deleteFile(key);
      res.send('File deleted successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting file');
    }
  }
}
