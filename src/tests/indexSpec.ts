import app from '../index';
import supertest from 'supertest';
import path from 'path';
import resize from './../controllers/resize';
const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });

    it('gets the /api/images', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(404);
    });

    it('gets the /api/images?filename=icelandwaterfall&width=100&height=200', async () => {
        const response = await request.get(
            '/api/images?filename=icelandwaterfall&width=100&height=200'
        );
        expect(response.status).toBe(200);
    });

    it('gets the resized image according to width and height provided', async () => {
        const filePath = path.join(
            __dirname + '../../../images/starter/icelandwaterfall.jpg'
        );
        console.log(filePath);
        const fileName = 'icelandwaterfall' + '_' + 100 + '_' + 200 + '.jpg';
        const resizedFiledir = path.join(__dirname + '../../../images/thumb/');
        const resizedFilePath = resizedFiledir + fileName;
        await resize(filePath, 100, 200, resizedFilePath);
        expect(resizedFilePath).toBeTruthy();
    });
});
