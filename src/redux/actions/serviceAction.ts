import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

  export const fetchServices = createAsyncThunk(
    'service/getall',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/service/getallvisible');
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
);

export const fetchServiceById = createAsyncThunk(
  'service/fetchById',
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/service/${id}`);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch service';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchServicesByCategory = createAsyncThunk(
  'service/fetchByCategory',
  async (categoryIds: string[], thunkAPI) => {
    try {
      const response = await axiosInstance.post('/service/categories', { categoryIds });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch services';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
