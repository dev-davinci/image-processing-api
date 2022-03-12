import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes';

dotenv.config();

const PORT = process.env.PORT;

const app: Application = express();

app.use(morgan('dev'));

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Project is running on port: ${PORT}`);
});

export default app;
