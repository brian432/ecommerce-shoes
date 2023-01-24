import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postRegister } from '../services/authFetch';
import { RegisterState } from "../types/types";

const initialState: RegisterState = {
    loading: false,
    register: null,
    error: null
};

const registerSlice = createSlice({
    name: "register",
    initialState: initialState,
    reducers: {
        registerSwitch(state) {
            state.register = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(postRegister.pending, (state) => {
                state.loading = true;
                state.register = null;
            })
            .addCase(postRegister.fulfilled, (state) => {
                state.loading = false;
                state.register = true;
            })
            .addCase(postRegister.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.register = false;
                state.error = action.payload;
            })
    },
});
export const {
    registerSwitch
} = registerSlice.actions;
export default registerSlice.reducer;