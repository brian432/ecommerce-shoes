import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrderCard, getAllOrdersCards } from '../services/orderFetch';
import { OrderState } from "../types/types";

const initialState: OrderState = {
    loading: false,
    orderId: "",
    orders: [],
    error: null
};

export const OrderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createOrderCard.pending, (state) => {
                state.loading = true
            })
            .addCase(createOrderCard.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.orderId = action.payload;
            })
            .addCase(createOrderCard.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllOrdersCards.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllOrdersCards.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrdersCards.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default OrderSlice.reducer;