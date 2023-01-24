import express, { NextFunction, Request, Response } from 'express';
import { validateProduct } from '../../utils/validator';
import { verifyTokenAndAdmin } from '../midlewares/verifyToken';
import Product from '../models/Products';
import { ProductsTypes } from '../types';

const productRouter = express.Router();

//Crear productos

productRouter.post('/', validateProduct, verifyTokenAndAdmin, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct: ProductsTypes = await newProduct.save()
        res.status(200).json({
            status_code:200,
            data: savedProduct
        });
    }catch(err){
        next(err)
    };
});

//Buscar productor por el id

productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { params: { id } } = req;
    try {
        const product = await Product.findById(id);
        res.status(200).json({
            status_code: 200,
            data: product
        });
    } catch (err) {
        next(err)
    };
});

//Get all products

productRouter.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status_code: 200,
            data: products
        });
    } catch (err) {
        next(err)
    };
});

export default productRouter;