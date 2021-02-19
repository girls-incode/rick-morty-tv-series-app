import express, {
    NextFunction,
    Request,
    Response,
} from 'express';
import { verifyToken } from '../middleware/auth';
import { fetchService } from '../services/character';

const router = express.Router();
const url = process.env.CHARACTERS_URL || '';

router.get('/', verifyToken, getCharacters);

function getCharacters(req: Request, res: Response, next: NextFunction) {
    fetchService(url)
        .then((data:any) => {
            res.send(data);
        })
        .catch(next); 
}

export default router;