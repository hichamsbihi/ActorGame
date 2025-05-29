import { configureStore } from '@reduxjs/toolkit';
import { questionApi } from '../services/QuestionApi';

const store = configureStore({
    reducer: {
        [questionApi.reducerPath]: questionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(questionApi.middleware),
});

export default store;