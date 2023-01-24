import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import User from '../models/Users';
import { UserToken } from '../types';
import { validateLogin } from '../../utils/validator';

const { SECRET } = process.env;

const loginRouter = express.Router();

loginRouter.post('/', validateLogin, async (req: Request, res: Response): Promise<Response> => {

    const { body: { username, password } } = req;
    try {
        const user = await User.findOne({ username: username });

        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

        if (!(user && passwordCorrect)) {
            throw new Error("invalid username or password");
        };

        const userForToken: UserToken = {
            id: user._id,
            isAdmin: user.isAdmin
        };
        const token = jwt.sign(userForToken, SECRET as string, { expiresIn: "3d" });

         return res.status(200)
            .json({
                status_code: 200,
                data: {
                    token,
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            });
    } catch (err: any) {
        return res.status(401).send({
            status_code: 401,
            error: err.message
        });
    };
});

export default loginRouter;