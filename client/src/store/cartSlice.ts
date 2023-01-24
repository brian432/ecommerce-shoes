import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartCards, createCartCard, updateCartCard, delCartCard, delAllCartCards } from '../services/cartFetch';
import { CartState, ProductCart } from '../types/types';

const initialState: CartState = {
    loading: false,
    cards: [],
    quantity: Number(localStorage.getItem("quantity")) || 0,
    total: 0,
    error: null
};

export const CartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        quantitySwitch(state) {
            state.quantity = 0
            localStorage.removeItem("quantity");
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createCartCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCartCard.fulfilled, (state, action: PayloadAction<any>) => {
                state.quantity += 1;
                localStorage.setItem("quantity", `${state.quantity}`);
                state.loading = false;
                state.cards = state.cards.concat(action.payload);
            })
            .addCase(createCartCard.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCartCards.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartCards.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.cards = action.payload;
                state.quantity = state.cards.length;
                localStorage.setItem("quantity", `${state.cards?.length}`);
                state.total = state.cards?.map(card => card.price).reduce((suma, actual) => suma + actual, 0); //Creamos un array con todos los precios de los productos, utilizamos reduce para sumarlos
            })
            .addCase(getCartCards.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCartCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartCard.fulfilled, (state, action: PayloadAction<any>) => {
                const updatedCartCards: ProductCart[] = state.cards.map(card => card.id !== action.payload.id ? card : action.payload);

                state.loading = false;
                state.cards = updatedCartCards;
                state.total = updatedCartCards.map(card => card.price).reduce((suma, actual) => suma + actual, 0);
            })
            .addCase(updateCartCard.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(delCartCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(delCartCard.fulfilled, (state, action: PayloadAction<any>) => {
                const updatedCartCards: ProductCart[] = state.cards.filter(card => card.id !== action.payload.id);
                state.loading = false;
                state.cards = updatedCartCards;
                state.quantity = state.cards.length;
                localStorage.setItem("quantity", `${state.cards.length}`);
                state.total = updatedCartCards.map(product => product.price).reduce((suma, actual) => suma + actual, 0);
            })
            .addCase(delCartCard.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(delAllCartCards.pending, (state) => {
                state.loading = true;
            })
            .addCase(delAllCartCards.fulfilled, (state) => {
                state = initialState;
            })
            .addCase(delAllCartCards.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});
export const {
    quantitySwitch
} = CartSlice.actions;
export default CartSlice.reducer;