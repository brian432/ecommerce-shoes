import express, { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../midlewares/verifyToken';
import Cart from '../models/Carts';
import User from '../models/Users';
import { CartTypes, RequestMasPropUser } from '../types';

const cartRouter = express.Router();

//Create

cartRouter.post('/', verifyToken, async (req: RequestMasPropUser, res: Response, next: NextFunction): Promise<void> => {
    if (req.user !== undefined) {
        const newCart = new Cart({
            ...req.body,
            user: req.user.id
        });
        try {
            const user = await User.findById(req.user.id);
            const savedCart: CartTypes = await newCart.save()

            if (user?.carts !== undefined) {
                user.carts = user.carts.concat(savedCart._id)
            }
            await user?.save();
            res.status(200).json({
                status_code: 200,
                data: savedCart
            });
        } catch (err) {
            next(err)
        };
    }
});

//Update

cartRouter.put('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { params: { id } } = req;
    try {
        const updateCart = await Cart.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });
        res.status(200).json({
            status_code: 200,
            data: updateCart
        });
    } catch (err) {
        next(err)
    };
});

//Delete fo id

cartRouter.delete('/:id', verifyToken, async (req: RequestMasPropUser, res: Response, next: NextFunction): Promise<void> => {
    const { params: { id } } = req;
    if (req.user !== undefined) {
        try {
            const cardDeleted = await Cart.findById(id);
            await Cart.findByIdAndDelete(id);
            await User.findByIdAndUpdate(req.user.id, { 
                $pull: {
                    carts: id
                }
            }, { new: true });
            res.status(200).json({
                status_code: 200,
                data: cardDeleted
            });
        } catch (err) {
            next(err)
        };
    }
});

cartRouter.delete('/', verifyToken, async (req: RequestMasPropUser, res: Response, next: NextFunction): Promise<void> => {
    const { body: { productsIds } } = req;
    if (req.user !== undefined) {
        try {
            await User.findByIdAndUpdate(req.user.id, { $set: { carts: [] } })
            await Cart.deleteMany({
                _id: {
                    $in: productsIds
                }
            });
            res.status(204).json({
                status_code: 204
            })

        } catch (err) {
            next(err)
        };
    }
});

//Read 

cartRouter.get('/', verifyToken, async (req: RequestMasPropUser, res: Response, next: NextFunction): Promise<void> => {
    if (req.user !== undefined) {
        const id = req.user.id;
        try {
            const user = await User.findById(id).populate('carts', { title: 1, quantity: 1, color: 1, img: 1, id: 1, size: 1, price: 1, productId: 1 })
            res.status(200).json({
                status_code: 200,
                data: user?.carts
            });
        } catch (err) {
            next(err)
        };
    }
});

export default cartRouter;