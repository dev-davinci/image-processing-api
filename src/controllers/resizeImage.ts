import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import resize from './resize';

const resizeImage = async (req: Request, res: Response) => {
    const fileName = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (!fileName || width === undefined || height === undefined) {
        res.status(404).send(
            "You haven't entered your parameters yet. please check and try again."
        );
        return;
    }

    let fileFormat = req.query.format as string;
    let fileExtension = '.' + fileFormat;

    if (fileFormat === undefined) {
        fileFormat = 'jpeg';
        fileExtension = '.jpg';
    }

    const filePath: string = path.join(
        __dirname + '../../../images/starter/' + fileName + fileExtension
    );

    if (isNaN(width) || isNaN(height)) {
        res.send(`Please enter valid number for width and height`);
        return;
    }

    const resizedFileName: string =
        fileName + '_' + width + '_' + height + fileExtension;
    const resizedFiledir: string = path.join(
        __dirname + '../../../images/thumb/'
    );
    const resizedFilePath: string = resizedFiledir + resizedFileName;

    try {
        try {
            fs.accessSync(filePath, fs.constants.F_OK);
        } catch (err) {
            res.send(`The image does not exist in this directory`);
            return;
        }

        try {
            fs.accessSync(resizedFilePath, fs.constants.F_OK);

            res.sendFile(resizedFilePath);
            return;
        } catch (err) {
            console.log(`No resized file found`);
        }

        try {
            fs.accessSync(resizedFiledir, fs.constants.F_OK);
        } catch (err) {
            try {
                fs.mkdirSync(resizedFiledir);
            } catch (err) {
                res.send(`Error in creating directory`);
                return;
            }
        }

        await resize(filePath, width, height, resizedFilePath);
        res.sendFile(resizedFilePath);
        return;
    } catch (err) {
        console.log(err);
    }
};

export default resizeImage;
