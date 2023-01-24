import { configureStore } from "@reduxjs/toolkit";
import registerReducer from './registerSlice';
import loginReducer from './loginSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import stripeReducer from './stripeSlice';
import orderReducer from './orderSlice';
import favsReducer from './favsSlice';

export const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        products: productsReducer,
        cart: cartReducer,
        stripe: stripeReducer,
        order: orderReducer,
        favs: favsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;