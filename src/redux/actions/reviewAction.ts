import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

  export const fetchReviews = createAsyncThunk(
    '/review/all',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get('/review/allvisible');
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
);
