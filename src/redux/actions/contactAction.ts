import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  async (message: Contact) => {
    try {
      const response = await axiosInstance.post("/contact/create", message);
      return response.data;
    } catch (error:any) {
      return error.response.data;
    }
  }
);