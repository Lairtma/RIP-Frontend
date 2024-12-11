import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface orderState {
    id: number;
    count: number; // Добавляем состояние для отфильтрованных продуктов
}

const initialState: orderState = {
    id: 0,
    count: 0,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setId(state, action: PayloadAction<number>) {
            state.id = action.payload;
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
    },
});


export const { setId, setCount } = orderSlice.actions;
export default orderSlice.reducer;