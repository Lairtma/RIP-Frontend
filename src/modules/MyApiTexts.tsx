import { Text, ApiResponse, OrderResponse } from "./MyInterface";
import { MOCK_DATA_TEXTS } from "./MockDataTexts";
import { api } from '../api';  // Путь к сгенерированному Api
import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';

interface LoginPayload {
  login: string;
  password: string;
}

interface LoginUserResponse {
  token: string
}

export const loginUser = createAsyncThunk<LoginUserResponse, LoginPayload>(
  "auth/loginUser",
  async ({login, password}, { rejectWithValue }) => {
    try {
        const response = await api.api.loginUserCreate({login, password});
        return response.data as LoginUserResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Authorization error");
    }
  }
);

export const getTextByIdThunk = createAsyncThunk<Text | null, string | number>(
  'texts/getByID',
  async (id) => {
    try {
      const response = await api.api.textsDetail(`${id}`);
      if (response.data && response.data.text) {
        return response.data.text;
      } else {
        console.warn("Response data or 'text' property missing from API response.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching text by ID, using MOCK_DATA_TEXTS", error);
      const mockText = MOCK_DATA_TEXTS.Texts[Number(id) - 1];
      return mockText || null;
    }
  }
);

export const getOrderByIdThunk = createAsyncThunk<OrderResponse | null, string | number>(
  'orders/getByID',
  async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Токен отсутствует. Авторизация не выполнена.");
      return null;
    }
    try {
      const response = await api.api.orderDetail(parseInt(id.toString()), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        // Attempt to cast to OrderResponse.  This is risky if the types truly don't match.
        const orderResponse: OrderResponse | null = {Order: response.data["order"], count: response.data["count"], Texts: response.data["texts"]}; //Risky Cast

        //Handle potential issues.  Log a warning if the cast fails.
        if(orderResponse){
          return orderResponse;
        } else {
          console.error("API response data does not match OrderResponse type.");
          return null;
        }

      } else {
        console.warn("Response data missing from API response.");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);