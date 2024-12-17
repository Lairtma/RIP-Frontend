import { Text, ApiResponse, OrderResponse } from "./MyInterface";
import { MOCK_DATA_TEXTS } from "./MockDataTexts";
import { api } from '../api';  // Путь к сгенерированному Api
import { createAsyncThunk } from '@reduxjs/toolkit';

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



export const getTextByType = async (
    textType : string,
  ): 
  Promise<ApiResponse> => {


    try {

      const token = localStorage.getItem("token"); // Получение токена из localStorage
      if (token) {
        const response = await api.api.textsList({
          headers: {
              Authorization: `Bearer ${token}`,
          }});
          return { Texts: response.data["texts"], OrderId: response.data["text_req_ID"], TextsInOrderCount: response.data["count"] };
      }
      else{
        const response = await fetch("/api/texts?type=" + textType);
        const info = await response.json();
        return { Texts: info["texts"], OrderId: info["text_req_ID"], TextsInOrderCount: info["count"] };
      }
    } 
    catch(error) {
      const filteredData = MOCK_DATA_TEXTS.Texts.filter(text => 
        text.enc == true && textType == "en" || text.enc == false && textType == "de" || textType == ""
      );

      return { Texts: filteredData, OrderId: 0, TextsInOrderCount: 0};
    }

};

export const getTextById = async (
    text_id : string | number
  ): 
  Promise<Text> => {

    try {
      const response = await fetch(`/api/texts/${text_id}`);
      const info = await response.json();
      return info["text"];
    } 
    catch(error) {
      return MOCK_DATA_TEXTS.Texts[Number(text_id) - 1]
    }

};

export const getOrderByID = async (id: number): Promise<OrderResponse | null> => {
  const token = localStorage.getItem("token"); // Получение токена из localStorage
  if (!token) {
      console.error("Токен отсутствует. Авторизация не выполнена.");
      return null;
  }

  try {
      const response = await api.api.orderDetail(id, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.data) {
          return {Order: response.data["order"], count: response.data["count"], Texts: response.data["texts"]}; // Возвращаем успешный ответ
      } else {
          console.error("Данные отсутствуют в ответе.");
          return null;
      }
  } catch (err: any) {
      // Обработка ошибок
      if (err.response?.data?.error) {
          console.error("Ошибка API:", err.response.data.error);
      } else {
          console.error("Произошла ошибка при выполнении запроса:", err);
      }
      return null;
  }
};