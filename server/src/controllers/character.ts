import express, {
    NextFunction,
    Request,
    Response,
} from 'express';
import { verifyToken } from '../middleware/auth';
import { fetchService } from '../services/api';
import HttpException from './../utils/httpException';

const router = express.Router();
const url = process.env.CHARACTERS_URL || '';

router.get('/', verifyToken, getCharacters);
router.get('/:id', verifyToken, getCharacter);

function getCharacters(req: Request, res: Response, next: NextFunction) {
    fetchService(url)
        .then((data:any) => {
            res.send(data);
        })
        // .catch(err => res.status(err.status).json({ message: err.message }))
        .catch(next)
}
function getCharacter(req: Request, res: Response, next: NextFunction) {
    if (!parseInt(req.params.id)) {
        res.status(400).json({ message: 'Invalid character id' });
    }
    fetchService(url + '/' + req.params.id)
        .then((data: any) => {
            res.send(data);
        })
        // .catch(err => res.status(err.status).json({ message: err.message }))
        .catch(next)
}

export default router;