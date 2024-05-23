import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "user",
    initialState: { userData: null, cart: [] },
    reducers: {
        userData(state, action) {
            return action.payload;
        },
        addToCart(state, action) {
            if (!state.cart) {
                state.cart = [];
            }
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
        },
    },
});

export default slice.reducer;
export const { userData, addToCart,removeFromCart } = slice.actions;
