import express, {
    Application
} from 'express';

import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import db from './utils/db';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoute from './controllers/user';
import characterRoute from './controllers/character';
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

export default app;