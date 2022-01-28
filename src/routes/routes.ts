import {Router} from 'express';
import {AuthenticatedUserHandler, LoginHandler, RegisterHandler} from "../controllers/auth.controller";

export const routes = (router: Router) => {
    router.get('/api/register', RegisterHandler);
    router.post('/api/register', RegisterHandler);
    router.post('/api/login', LoginHandler);

    router.get('/api/user', AuthenticatedUserHandler);
};

