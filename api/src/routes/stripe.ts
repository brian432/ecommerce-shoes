import express, { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import { verifyToken } from '../midlewares/verifyToken';

const stripeRouter = express.Router();
const stripeKey = process.env.STRIPE_KEY;

const stripe = new Stripe(stripeKey as string, {
    apiVersion: '2022-11-15',
});

stripeRouter.post('/payment', verifyToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const stripeCharges = await stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        });
        res.status(200).json({
            status_code: 200,
            data: stripeCharges
        });
    }catch(err){
        next(err)
    }
});

export default stripeRouter;