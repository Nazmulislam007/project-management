import apiSlice from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/Project/projectSlice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        input: projectReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
