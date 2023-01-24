import { createAsyncThunk } from "@reduxjs/toolkit";

const { API_URL } = process.env;

type Result = {
    status_code: number,
    data?: [],
    error?: any
}

export const getProducts = createAsyncThunk('products/getProducts',
    async (_, thunkApi) => {
        try {
            const response: Response = await fetch(`${API_URL}/api/products`);
            const result: Result = await response.json();

            if (result.status_code === 200) return result.data;
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const getProductsId = createAsyncThunk('products/getProductsId',
    async (id: string, thunkApi) => {
        try {
            const response = await fetch(`${API_URL}/api/products/${id}`);
            const result = await response.json();

            if (result.status_code === 200) return result.data;
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);