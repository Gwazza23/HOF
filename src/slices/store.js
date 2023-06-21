import { configureStore } from '@reduxjs/toolkit';

import userDataReducer from './userSlice';
import productsReducer from './productsSlice';

const store = configureStore({
    reducer: {
        users: userDataReducer,
        products: productsReducer
    }
})

export default store