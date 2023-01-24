import express, { Request, Response, NextFunction } from 'express';
import { verifyToken, verifyTokenAndAdmin } from '../midlewares/verifyToken';
import Order from '../models/Order';
import User from '../models/Users';
import { OrderTypes, RequestMasPropUser } from '../types';

const orderRouter = express.Router();

//Crear orders

orderRouter.post('/', verifyToken, async (req: RequestMasPropUser, res: Response, next: NextFunction): Promise<void> => {
    if (req.user !== undefined) {
        const newOrder = new Order({
            ...req.body,
            user: req.user.id
        });
        try {
            const user = await User.findById(req.user.id);
            const savedOrder: OrderTypes = await newOrder.save();

            if (user?.orders !== undefined) {
                user.orders = user.orders.concat(savedOrder._id)
            }
            await user?.save();
            res.status(200).json({
                status_code: 200,
                data: savedOrder
            });
        } catch (err) {
            next(err)
        };
    }
});

//Eliminar order por el id

orderRouter.delete('/:id', verifyTokenAndAdmin, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { params: { id } } = req;
    try {
        await Order.findByIdAndDelete(id);
        res.status(200).json({
            status_code: 200,
            data: "order has been deleted..."
        });
    } catch (err) {
        next(err)
    };
});

orderRouter.get("/", verifyToken, async (req: RequestMasPropUser, res: Response, next: NextFunction): Promise<void> => {
    if (req.user !== undefined) {
        const id = req.user.id;
        try {
            const user = await User.findById(id).populate('orders');
            res.status(200).json({
                status_code: 200,
                data: user?.orders
            })
        } catch (err) {
            next(err)
        }
    }
});

export default orderRouter;