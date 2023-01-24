import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductCart } from "../types/types";

const { API_URL } = process.env;

type StripeCard = {
    tokenId: string,
    amount: number,
    cards: ProductCart[]
}

export const createStripeCard = createAsyncThunk('stripe/createStripeCard',
    async ({ tokenId, amount, cards }: StripeCard, thunkApi) => {
        try {
            const response = await fetch(`${API_URL}/api/checkout/payment`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("tokenAuth")
                },
                body: JSON.stringify({
                    tokenId,
                    amount
                })
            });
            const result = await response.json();

            if (result.status_code === 200) return { result, cards }
            else return thunkApi.rejectWithValue(result.error);

        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);