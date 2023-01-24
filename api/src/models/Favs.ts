import { Schema, model } from "mongoose";
import { FavsReturnedObject, FavsTypes } from "../types";

const FavsSchema = new Schema<FavsTypes>({
    productId: { type: String, required: true },
    title: { type: String, required: true },
    color: { type: [String], required: true },
    price: { type: Number, required: true },
    img: { type: [[String]], required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

FavsSchema.set('toJSON', {
    transform: (_document, returnedObject: FavsReturnedObject) => {
        returnedObject.id = `${returnedObject._id}`;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Favs = model<FavsTypes>('Favs', FavsSchema);

export default Favs;