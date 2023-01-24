import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProducts, getProductsId } from "../services/productsFetch";
import { ProductsState, ProductsTypes } from "../types/types";

const initialState: ProductsState = {
    loading: false,
    products: [],
    productId: {} as ProductsTypes,
    error: null
};

export const productsSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.products = [];
                state.error = action.payload;
            })
            .addCase(getProductsId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsId.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.productId = action.payload
            })
            .addCase(getProductsId.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.productId = {} as ProductsTypes;
                state.error = action.payload;
            })
    },
});

export default productsSlice.reducer;