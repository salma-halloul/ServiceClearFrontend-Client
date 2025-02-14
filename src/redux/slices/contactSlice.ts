import { createSlice } from '@reduxjs/toolkit';
import { sendMessage } from '../actions/contactAction';

interface ContactState {
  contacts: Contact[];
  contact: Contact | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ContactState = {
  contacts: [],
  contact: null,
  loading: false,
  error: null,
  status: "idle",
};


const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.contact = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create message';
      });
  }

});

export default contactSlice.reducer;
