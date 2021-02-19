import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';
import morgan from 'morgan';
import characterRoute from './controllers/character';
import userRoute from './controllers/user';
import errorHandler from './middleware/errorHandler';
import db from './utils/db';
import validateEnv from './utils/validateEnv';

validateEnv();
db.connect();
const app: Application = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/v1/users', userRoute);
app.use('/api/v1/characters', characterRoute);
app.use(errorHandler);

export default app;