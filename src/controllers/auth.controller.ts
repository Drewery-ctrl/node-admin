import {Request, Response} from 'express';

export const RegisterHandler = (req: Request, res: Response) => {
    res.send(req.body);
};