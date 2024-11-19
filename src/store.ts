import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/dataSlice"; // Импортируйте ваш searchSlice

export const store = configureStore({
    reducer: {
        search: searchReducer, // Добавьте редьюсер поисковой строки
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;