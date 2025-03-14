import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        showCarts: (state) => state,
        addToCart: (state, action) => {
            const isExits = state.items.filter((item) => item._id === action.payload._id)
            if(!isExits[0]) {
                state.items.push(action.payload)
                return
            }
            isExits[0].qt += 1;
        },
        updateCart: (state, action) => {
            state.items.map((item) => {
                if(item._id === action.payload._id) {
                    item.qt = action.payload.qt
                }
            })
        },
        delteItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item._id != id)
        },
        resetCart: (state) => {
            state.items = []
        }
    }
})
export const getTotalPrice = (state) => state.carts.items.reduce((total, item) => total + item.price*item.qt, 0)

export const {showCarts, addToCart, delteItem, updateCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;