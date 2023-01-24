import { Schema, model } from "mongoose";
import { OrderTypes, OrderReturnedObject, ProductOrder } from "../types";

const ProductOrderSchema = new Schema<ProductOrder>({
    title: { type: String, required: true },
    productId: { type: String, required: true },
    color: { type: String, required: true },
    img: { type: String, required: true },
    size: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
})

const OrderSchema = new Schema<OrderTypes>({
    products: { type: [ProductOrderSchema], required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }
}, { timestamps: true });


OrderSchema.set('toJSON', {
    transform: (_document, returnedObject: OrderReturnedObject) => {
        returnedObject.id = `${returnedObject._id}`;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Order = model<OrderTypes>('Order', OrderSchema);

export default Order;