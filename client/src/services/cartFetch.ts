import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCart, PropToUpdateCard } from '../types/types';

const { API_URL } = process.env;

export const createCartCard = createAsyncThunk('cart/createCartCard',
    async ({ title, price, productId, quantity, color, img, size }: ProductCart, thunkApi) => {
        try {
            const response = await fetch(`${API_URL}/api/carts`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                },
                body: JSON.stringify({
                    title,
                    price,
                    productId,
                    quantity,
                    color,
                    img,
                    size
                })
            });
            const result = await response.json();

            if (result.status_code === 200) return result.data
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const getCartCards = createAsyncThunk('cart/getCartCards',
    async (_, thunkApi) => {
        console.log("---") 
        try {
            const response = await fetch(`${API_URL}/api/carts`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                }
            });
            const result = await response.json();

            if (result.status_code === 200) return result.data;
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const updateCartCard = createAsyncThunk('cart/updateCartCard',
    async ({ quantity, price, id }: PropToUpdateCard, thunkApi) => {
        try {
            const response = await fetch(`${API_URL}/api/carts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                },
                body: JSON.stringify({
                    quantity,
                    price
                })
            });
            const result = await response.json();
            if (result.status_code === 200) return result.data
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const delCartCard = createAsyncThunk('cart/delCartCard',
    async (id: string | undefined, thunkApi) => {
        try {
            const response = await fetch(`${API_URL}/api/carts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                }
            });
            const result = await response.json();
            if (result.status_code === 200) return result.data
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);


export const delAllCartCards = createAsyncThunk('cart/delAllCartCards',
    async (productsIds: (string | undefined)[], thunkApi) => {
        try {
            const response = await fetch(`${API_URL}/api/carts`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                },
                body: JSON.stringify({
                    productsIds
                })
            });
            const result = await response.json();
            if (result.status_code !== 204) return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);