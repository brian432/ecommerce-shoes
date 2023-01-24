import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createFavCard, delFavCard, getAllFavsCards } from '../services/favsFetch';
import { CardProducts } from "../types/types";

interface FavsState {
    loading: boolean
    favsProducts: CardProducts[]
    error: null | string
}

const initialState: FavsState = {
    loading: false,
    favsProducts: [],
    error: null
};

export const FavsSlice = createSlice({
    name: "favs",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createFavCard.pending, (state) => {
                state.loading = true
            })
            .addCase(createFavCard.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.favsProducts = state.favsProducts?.concat(action.payload);
            })
            .addCase(createFavCard.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllFavsCards.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllFavsCards.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.favsProducts = action.payload;
            })
            .addCase(getAllFavsCards.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(delFavCard.pending, (state) => {
                state.loading = true
            })
            .addCase(delFavCard.fulfilled, (state, action: PayloadAction<any>) => {
                const favsProducts = state.favsProducts?.filter(fav => fav.id !== action.payload.id);
                state.loading = false;
                state.favsProducts = favsProducts;
            })
            .addCase(delFavCard.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default FavsSlice.reducer;