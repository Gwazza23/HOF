import { configureStore } from '@reduxjs/toolkit';

import userDataReducer from './userSlice';

const store = configureStore({
    reducer: {
        users: userDataReducer
    }
})

export default store