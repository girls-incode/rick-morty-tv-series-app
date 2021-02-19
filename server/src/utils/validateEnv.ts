import { cleanEnv, port, str, url } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        MONGODB_URI: str(),
        ACCESS_TOKEN_SECRET: str(),
        REFRESH_TOKEN_SECRET: str(),
        CHARACTERS_URL: url(),
        PORT: port(),
    });
}

export default validateEnv;