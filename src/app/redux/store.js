import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import counterReducer from "./features/counterSlice";

const store = configureStore({
    reducer: {
        carts: cartReducer,
        counter: counterReducer
    }
})

export default store