import { Text, ApiResponse, OrderResponse } from "./MyInterface";
import { MOCK_DATA_TEXTS } from "./MockDataTexts";
import { api } from '../api';  // Путь к сгенерированному Api



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