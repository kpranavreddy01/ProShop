import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Retrieving cart data from localStorage and setting the initial state
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            // Ensure that state.cartItems is always an array
            state.cartItems = state.cartItems || [];

            // Make sure the item has a valid _id before accessing it
            if (item && item._id) {
                const existItem = state.cartItems.find((x) => x._id === item._id);

                if (existItem) {
                    state.cartItems = state.cartItems.map((x) =>
                        x._id === existItem._id ? item : x
                    );
                } else {
                    state.cartItems.push(item);
                }
            }

            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((x) => x._id !== id);
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
    },
    },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
