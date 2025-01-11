
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import { SchemasAddTextToOrderResponce } from '../../api/Api';

// Интерфейс для входных параметров
interface AddTextPayload {
    textId: string;
    token?: string;
  }
  
  // Интерфейс для ответа
  export interface SchemasAddMealToMilkReqResponse {
    success?: boolean;
    message?: string;
  }
  
  export const addTextToOrder = createAsyncThunk<
    SchemasAddTextToOrderResponce,  // Тип ответа
    AddTextPayload,                   // Тип входных параметров
    { rejectValue: string }            // Тип ошибок
  >(
    'text/addTextToOrder',
    async ({ textId, token }, { rejectWithValue }) => {
      try {
        const response = await api.api.textToOrderCreate(textId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data as SchemasAddTextToOrderResponce;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Ошибка при добавлении продукта');
      }
    }
  );