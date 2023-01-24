import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createStripeCard } from '../services/stripeFetch';
import { StripeData, StripeState } from "../types/types";

const initialState: StripeState = {
    loading: false,
    cards: [],
    data: {} as StripeData,
    error: null
};

export const StripeSlice = createSlice({
    name: "stripe",
    initialState: initialState,
    reducers: {
        delStripeCard: (state) => {
            state.cards = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createStripeCard.pending, (state) => {
                state.loading = true
            })
            .addCase(createStripeCard.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.cards = action.payload.cards;
                state.data = action.payload.result.data;
            })
            .addCase(createStripeCard.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});
export const { delStripeCard } = StripeSlice.actions;
export default StripeSlice.reducer;