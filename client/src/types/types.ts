import * as yup from 'yup'
import { userSchema } from '../utils/yup'

//Types for register
export type UserSchema = yup.InferType<typeof userSchema>;

export type RegisterType = {
    username: string
    email: string
    password: string
};

export type RegisterState = {
    loading: boolean
    register: boolean | null
    error: string | null | object
};


//types for login

export type LoginType = Omit<RegisterType, "email">;

type User = {
    token: string
    username: string
    email: string
    id: string
}

export type LoginState = {
    loading: boolean
    isLoggedIn: boolean
    user: User | null
    error: boolean
}


//types for products

export interface ProductsTypes {
    title: string
    desc: string
    category: string
    img: string[][]
    size: string[]
    color: string[]
    price: number
    inStock: boolean
    id: string
    productId?: string
    createdAt: string
    updatedAt: string
};

export type ProductsState = {
    loading: boolean,
    products: ProductsTypes[],
    productId: ProductsTypes,
    error: any
}

export type CardProducts = {
    productId: string
    title: string
    color: string[]
    price: number
    img: string[][]
    id?: string
}

//types for product state component

export type StateImg = {
    imgPaths: string[],
    colorShoes: string
}

export interface InfoShoesProps {
    product: ProductsTypes,
    imgActive: StateImg
}

//types for cart state

export type ProductCart = {
    title: string
    price: number
    productId: string
    img: string
    color: string
    quantity: number
    size: string
    id?: string
}

export interface CartState {
    loading: boolean
    cards: ProductCart[]
    quantity: number
    total: number
    error: null | string
};

export type PropToUpdateCard = {
    quantity: number
    price: number
    id: string | undefined
}

//stripe types

export type StripeData = {
    amount: number
    billing_details: {
        address: string
    }
}

export interface StripeState {
    loading: boolean
    cards: ProductCart[]
    data: StripeData,
    error: null | string
}


//order types

export type CreateOrderCardTypes = {
    products: Omit<ProductCart, "id">[]
    amount: number
    address: string
}

export interface ProductsOrder extends Omit<ProductCart, "id"> {
    _id: string
}

export type OrderCard = {
    id: string
    products: ProductsOrder[]
    amount: number
    address: {
        country: string
        city: string
    }
    createdAt: Date
    updatedAt: Date
}

export type OrderState = {
    loading: boolean
    orderId: string
    orders: OrderCard[]
    error: null | string
}

//Enum condicional Footer

export enum Paths {
    Product = 'product',
    Success = 'success',
    Login = 'login',
    Register = 'register'
}

//type function

export type MyFunctionType = () => void;