import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { OrderResponse } from "../modules/MyInterface";
import { getOrderByID } from "../modules/MyApiTexts"; // Подключаем вашу функцию
import { SchemasDeleteTextResponse } from "../api/Api";

interface orderState {
    id: number;
    count: number; // Добавляем состояние для отфильтрованных продуктов
    loading: boolean,
    error: string | null,
    orderData: OrderResponse | null;
}

const initialState: orderState = {
    id: 0,
    count: 0,
    loading: false,
    error: null,
    orderData: null
};

// Thunk: Загрузка данных корзины
export const fetchOrderBasketData = createAsyncThunk<
    OrderResponse,
    number,
    { rejectValue: string }
>("order/fetchOrderData", async (id, { rejectWithValue }) => {
    try {
        const data = await getOrderByID(id); // Используем вашу функцию
        if (!data) {
            return rejectWithValue("Не удалось загрузить данные корзины");
        }
        return data;
    } catch (err: any) {
        return rejectWithValue(err.message || "Ошибка при загрузке корзины");
    }
});

// Thunk: Оформление заявки
export const confirmOrder = createAsyncThunk<void, number, { rejectValue: string }>(
    "order/confirmOrder",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Токен не найден");

            await api.api.orderFormUpdate(
                id,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Ошибка при оформлении заявки");
        }
    }
);

// Thunk: Удаление заявки
export const deleteOrder = createAsyncThunk<void, number, { rejectValue: string }>(
    "order/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Токен не найден");

            await api.api.orderDelete(
                id,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Ошибка при удалении заявки");
        }
    }
);

// Thunk: Удаление продукта из заявки
export const deleteProductFromOrder = createAsyncThunk<
    number,
    { order_id: number; text_id: number },
    { rejectValue: string }
>("order/deleteTextFromOrder", async ({ order_id, text_id }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Токен не найден");

        await api.api.orderTextDelete(order_id.toString(), {id: text_id}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return text_id; // Возвращаем удалённый mealId для обновления состояния
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Ошибка при удалении продукта");
    }
});


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
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderBasketData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderBasketData.fulfilled, (state, action) => {
                state.loading = false;
                state.orderData = action.payload;
            })
            .addCase(fetchOrderBasketData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Ошибка при загрузке корзины";
            })
            .addCase(confirmOrder.rejected, (state, action) => {
                state.error = action.payload || "Ошибка при оформлении заявки";
            })
            .addCase(confirmOrder.rejected, (state, action) => {
                state.error = action.payload || "Ошибка при удалении заявки";
            })
            .addCase(deleteProductFromOrder.fulfilled, (state, action) => {
                if (state.orderData) {
                    state.orderData.Texts = state.orderData.Texts.filter(
                        (meal) => meal.id !== action.payload
                    );
                }
            })
            .addCase(deleteProductFromOrder.rejected, (state, action) => {
                state.error = action.payload || "Ошибка при удалении продукта";
            });
    },
});


export const { setId, setCount } = orderSlice.actions;
export default orderSlice.reducer;