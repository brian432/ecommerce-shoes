import express, { NextFunction, Response } from "express";
import { verifyTokenAndAdmin } from "../midlewares/verifyToken";
import { RequestExtend } from "../types";
import User from "../models/Users";

const userRouter = express.Router();

userRouter.get('/:id', verifyTokenAndAdmin, async (req: RequestExtend, res: Response, next: NextFunction): Promise<void> => {

    const { params: { id } } = req;
    try {
        const user = await User.findById(id);
        res.status(200).json({
            status_code: 200,
            data: user
        });
    } catch (err) {
        next(err)
    };
});

userRouter.get('/', async (_req: RequestExtend, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.find();
        res.status(200).json({
            status_code: 200,
            data: user
        });
    } catch (err) {
        next(err)
    };
});

export default userRouter;