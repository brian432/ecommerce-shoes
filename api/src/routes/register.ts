import User from '../models/Users';
import express, { Request, Response } from 'express';
import { UserTypes } from '../types';
import bcrypt from 'bcrypt';
import { validateRegister } from '../../utils/validator';

const registerRouter = express.Router();

registerRouter.post('/', validateRegister, async (req: Request, res: Response): Promise<void> => {
    const { body: { username, email, password } } = req;
    try {

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const uniqueUsername = await User.findOne({ username: username });
        if (uniqueUsername) throw new Error("duplicate key error");

        const user = new User<UserTypes>({
            username,
            email,
            passwordHash
        });

        const savedUser: UserTypes = await user.save();
        res.status(201).json({
            status_code: 201,
            data: savedUser
        });
    } catch (err) {
        res.status(400).send({
            status_code: 400,
            error: "duplicate key error"
        })
    }
});

export default registerRouter;