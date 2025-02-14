import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
    'categories/fetchAll',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/category/all');
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
);
