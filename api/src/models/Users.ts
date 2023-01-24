import { Schema, model } from "mongoose";
import { UserReturnedObject, UserTypes } from "../types";

const UserSchema = new Schema<UserTypes>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    carts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cart'
        }
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    favs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Favs'
        }
    ]
}, { timestamps: true });

UserSchema.set('toJSON', {
    transform: (_document, returnedObject: UserReturnedObject) => {
        returnedObject.id = `${returnedObject._id}`;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = model<UserTypes>('User', UserSchema);

export default User;