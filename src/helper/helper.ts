import * as sharp from 'sharp';
import { IUploadOptions, IUploadedFile, IServiceConfigData } from '../types/file.interface';
import { uploadToS3 } from '../utils/aws.utils';
import { uploadToBlob } from '../utils/azure.utils';

export const resizeFile = async (
    file: IUploadedFile,
    options: IUploadOptions,
    config: any,
    fileName: string,
    serviceType: string,
    storageLocation : string,
): Promise<string> => {

    const resizedFile = await sharp(file.buffer)
        .resize(options?.resize?.width, options?.resize?.height)
        .toBuffer();
    let uploadedPath = serviceType === 'AWS' ?
        await uploadToS3(resizedFile,
            `uploads/${fileName}`,
            file.mimeType,
            config,
            storageLocation) :
        await uploadToBlob(resizedFile,
            `uploads/${fileName}`,
            file.size,
            config,
            storageLocation)
    return uploadedPath

}


export const createThumbnail = async (
    file: IUploadedFile,
    options: IUploadOptions,
    config: object,
    fileName: String,
    serviceType: string,
    storageLocation : string
): Promise<String> => {
    let thumbnailSize = options?.thumbnail?.thumbnailSize ? options?.thumbnail?.thumbnailSize : []
    let thumbnailFilePath = await Promise.all(
        thumbnailSize.map(async (size) => {
            const thumbnail = await sharp(file.buffer).resize(size).toBuffer();
            const thumbnailKey = options.thumbnail?.thumbnailFolder
                ? `${options.thumbnail?.thumbnailFolder}/${size}-${fileName}`
                : `uploads/${size}-${fileName}`;
            let uploadedPath = serviceType === 'AWS' ?
                await uploadToS3(thumbnail,
                    thumbnailKey,
                    file.mimeType,
                    config,
                    storageLocation) :
                await uploadToBlob(thumbnail,
                    thumbnailKey,
                    file.size,
                    config,
                    storageLocation)
            return uploadedPath
        })
    );
    return `${thumbnailFilePath}`
}