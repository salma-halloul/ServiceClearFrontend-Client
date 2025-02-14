import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createQuote = createAsyncThunk(
  "quote/createQuote",
  async (data: Quote) => {
    try {
      const response = await axiosInstance.post("/quote/create", data);
      return response.data;
    } catch (error:any) {
      return error.response.data;
    }
  }
);
