import { Schema, model } from "mongoose";
import { CartTypes, CartReturnedObject } from "../types";

const CartSchema = new Schema<CartTypes>({
    title: String,
    price: Number,
    productId: String,
    color: String,
    quantity: {
        type: Number,
        default: 1
    },
    img: String,
    size: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

CartSchema.set('toJSON', {
    transform: (_document, returnedObject: CartReturnedObject) => {
        returnedObject.id = `${returnedObject._id}`;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Cart = model<CartTypes>('Cart', CartSchema);

export default Cart;