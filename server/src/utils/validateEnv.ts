import { cleanEnv, port, str, url } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        ACCESS_TOKEN_SECRET: str(),
        REFRESH_TOKEN_SECRET: str(),
        MONGODB_URI: str(),
        PORT: port(),
    });
}

export default validateEnv;