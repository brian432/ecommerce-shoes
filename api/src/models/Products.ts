import { Schema, model } from "mongoose";
import { ProductsReturnedObject, ProductsTypes } from "../types";

const ProductSchema = new Schema<ProductsTypes>({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: [[String]], required: true },
    size: { type: [String], required: true },
    color: { type: [String], required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true, required: true }
}, { timestamps: true }
);

ProductSchema.set('toJSON', {
    transform: (_document, returnedObject: ProductsReturnedObject) => {
        returnedObject.id = `${returnedObject._id}`;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Product = model<ProductsTypes>('Products', ProductSchema);

export default Product;