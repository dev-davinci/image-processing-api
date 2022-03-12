import express, { Request, Response } from 'express';
import resizeImage from './../../controllers/resizeImage';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
    resizeImage(req, res);
});

export default routes;
