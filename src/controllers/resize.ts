import sharp from 'sharp';

const resize = async (
    filePath: string,
    width: number,
    height: number,
    resizedFilePath: string
) => {
    await sharp(filePath)
        .resize(width, height)
        .toFormat('jpeg')
        .toFile(resizedFilePath);
};

export default resize;
