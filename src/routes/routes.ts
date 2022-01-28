import {Router} from 'express';
import {AuthenticatedUserHandler, LoginHandler, LogoutHandler, RegisterHandler} from "../controllers/auth.controller";

export const routes = (router: Router) => {
    router.post('/api/register', RegisterHandler);
    router.post('/api/login', LoginHandler);
    router.post('/api/logout', LogoutHandler);
    router.get('/api/user', AuthenticatedUserHandler);
};

