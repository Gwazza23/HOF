import { configureStore } from '@reduxjs/toolkit';

import userDataReducer from './userSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        users: userDataReducer,
        products: productsReducer,
        cart: cartReducer
    }
})

export default store