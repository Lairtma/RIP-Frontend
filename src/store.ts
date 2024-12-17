import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import searchReducer from "./slices/dataSlice"; // Импортируйте ваш searchSlice
import orderReducer from "./slices/orderSlice"; // Импортируйте ваш searchSlice

export const store = configureStore({
    reducer: {
        search: searchReducer, // Добавьте редьюсер поисковой строки
        order: orderReducer
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;