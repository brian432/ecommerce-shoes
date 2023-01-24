import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postLogin } from '../services/authFetch';
import { LoginState } from "../types/types";

const initialState: LoginState = {
    loading: false,
    isLoggedIn: !!localStorage.getItem('tokenAuth'),
    user: null,
    error: !!localStorage.getItem('authError')
};
const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        loginSwitch(state) {
            localStorage.removeItem("tokenAuth");
            state.isLoggedIn = false;
        },
        errorSwitch(state){
            localStorage.removeItem('authError');
            state.error = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(postLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(postLogin.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
                localStorage.setItem("tokenAuth", action.payload.token);
            })
            .addCase(postLogin.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = true;
                localStorage.setItem("authError", action.payload);
            })
    },
});
export const {
    loginSwitch,
    errorSwitch
} = loginSlice.actions;
export default loginSlice.reducer;