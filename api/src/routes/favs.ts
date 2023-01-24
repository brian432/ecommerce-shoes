import express, { Response, NextFunction } from 'express';
import { verifyToken } from '../midlewares/verifyToken';
import Favs from '../models/Favs';
import User from "../models/Users";
import { FavsTypes, RequestMasPropUser } from '../types';

const favsRouter = express.Router();

//Create

favsRouter.post('/', verifyToken, async (req: RequestMasPropUser, res: Response, next: NextFunction): Promise<void> => {
    if (req.user !== undefined) {
        const newFav = new Favs({
            ...req.body,
            user: req.user.id
        });
        try {
            const user = await User.findById(req.user.id);
            const savedFavs: FavsTypes = await newFav.save();

            if (user?.favs !== undefined) {
                user.favs = user.favs.concat(savedFavs._id)
            }
            await user?.save();
            res.status(200).json({
                status_code: 200,
                data: savedFavs
            });
        } catch (err) {
            next(err)
        };
    }
});

//Read

favsRouter.get("/", verifyToken, async (req: RequestMasPropUser, res: Response, next: NextFunction): Promise<void> => {
    if (req.user !== undefined) {
        const id = req.user.id;
        try {
            const user = await User.findById(id).populate('favs');
            res.status(200).json({
                status_code: 200,
                data: user?.favs
            })
        } catch (err) {
            next(err)
        }
    }
});

//Delete

favsRouter.delete('/:id', verifyToken, async (req: RequestMasPropUser, res: Response, next: NextFunction): Promise<void> => {
    const { params: { id } } = req;
    if (req.user !== undefined) {
        try {
            const favCardDeleted = await Favs.findById(id);
            await Favs.findByIdAndDelete(id);
            await User.findByIdAndUpdate(req.user.id, {
                $pull: {
                    favs: id
                }
            }, { new: true });
            res.status(200).json({
                status_code: 200,
                data: favCardDeleted
            });
        } catch (err) {
            next(err)
        };
    };
});

export default favsRouter;