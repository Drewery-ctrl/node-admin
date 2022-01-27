import {Router} from 'express';
import {RegisterHandler} from "../controllers/auth.controller";

export const routes = (router: Router) => {
    router.get('/api/register', RegisterHandler);
};