import express, { Application } from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import characterRoute from './controllers/character';
import userRoute from './controllers/user';
import errorHandler from './middleware/errorHandler';
import notFoundHandler from './middleware/notFound';
import db from './utils/db';
import validateEnv from './utils/validateEnv';

validateEnv();
db.connect();
const app: Application = express();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || ''
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1/user', userRoute);
app.use('/api/v1/character', characterRoute);

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;