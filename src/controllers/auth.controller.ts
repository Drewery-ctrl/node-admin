import {Request, Response} from 'express';
import {RegisterValidation} from "../validation/register.validation";
import {getManager} from "typeorm";
import bcryptjs from "bcryptjs";
import {User} from "../entity/user.entity";
import {LoginValidation} from "../validation/login.validation";
import {sign, verify} from "jsonwebtoken";

export const RegisterHandler = async (req: Request, res: Response) => {
    const body = req.body;
    const {error} = RegisterValidation.validate(body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    if (body.password !== body.passwordConfirmation) {
        return res.status(400).send({message: 'Passwords do not match'});
    }

    const repository = getManager().getRepository(User);
    const {password, ...user} = await repository.save({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: await bcryptjs.hash(body.password, 10),
    });
    res.status(200).send(user);
};

export const LoginHandler = async (req: Request, res: Response) => {
    const body = req.body;
    const {error} = LoginValidation.validate(body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const repository = getManager().getRepository(User);
    const user = await repository.findOne({email: body.email});
    if (!user) {
        return res.status(400).send({message: 'Invalid credentials'});
    }
    const isValid = await bcryptjs.compare(body.password, user.password);
    if (!isValid) {
        return res.status(400).send({message: 'Invalid credentials'});
    }

    const token = sign({id: user.id, email: user.email}, "secret");
    res.cookie('token', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24}); // 1 day
    const {password, ...userData} = user;
    res.status(200).send({message: `successfully logged in ${userData.firstName}`});
};


export const AuthenticatedUserHandler = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const payload: any = await verify(token, "secret");
        if (!payload) {
            return res.status(401).send({message: 'Unauthorized'});
        }
        const {id, email} = payload;
        const repository = getManager().getRepository(User);
        const user = await repository.findOne({id, email});
        if (!user) {
            return res.status(401).send({message: 'Unauthorized, user not found'});
        }
        const {password, ...userData} = user;
        res.status(200).send(userData);
    } catch (e) {
        return res.status(401).send({message: 'Unauthenticated...'});
    }
};


export const LogoutHandler = async (req: Request, res: Response) => {
    res.cookie('token', '', {maxAge: 0});
    res.status(200).send({message: 'successfully logged out'});
};
