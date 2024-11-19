import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Text } from "../modules/MyInterface";

interface SearchState {
    textType: string;
    filteredTexts: Text[]; // Добавляем состояние для отфильтрованных продуктов
}

const initialState: SearchState = {
    textType: "",
    filteredTexts: [],
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setTextType(state, action: PayloadAction<string>) {
            state.textType = action.payload;
        },
        setfilteredTexts(state, action: PayloadAction<Text[]>) {
            state.filteredTexts = action.payload;
        },
    },
});

export const { setTextType, setfilteredTexts } = searchSlice.actions;
export default searchSlice.reducer;