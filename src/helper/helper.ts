import * as sharp from 'sharp';
import { IUploadOptions, IUploadedFile, IServiceConfigData } from '../types/file.interface';
import { uploadToS3 } from '../utils/aws.utils';
import { uploadToBlob } from '../utils/azure.utils';

export const resizeFile = async (
    file: IUploadedFile,
    options: IUploadOptions,
    config: IServiceConfigData,
    fileName: string,
    serviceType: string
): Promise<string> => {

    const resizedFile = await sharp(file.buffer)
        .resize(options?.resize?.width, options?.resize?.height)
        .toBuffer();
    let uploadedPath = serviceType === 'AWS' ?
        await uploadToS3(resizedFile,
            `uploads/${fileName}`,
            file.mimeType,
            config) :
        await uploadToBlob(resizedFile,
            `uploads/${fileName}`,
            file.size,
            config,)
    return uploadedPath

}


export const createThumbnail = async (
    file: IUploadedFile,
    options: IUploadOptions,
    config: IServiceConfigData,
    fileName: String,
    serviceType: string
): Promise<String> => {
    let thumbnailSize = options?.thumbnailSize ? options?.thumbnailSize : []
    let thumbnailFilePath = await Promise.all(
        thumbnailSize.map(async (size) => {
            const thumbnail = await sharp(file.buffer).resize(size).toBuffer();
            const thumbnailKey = options.thumbnailFolder
                ? `${options.thumbnailFolder}/${size}-${fileName}`
                : `uploads/${size}-${fileName}`;
            let uploadedPath = serviceType === 'AWS' ?
                await uploadToS3(thumbnail,
                    thumbnailKey,
                    file.mimeType,
                    config) :
                await uploadToBlob(thumbnail,
                    thumbnailKey,
                    file.size,
                    config,)
            return uploadedPath
        })
    );
    return `${thumbnailFilePath}`
}