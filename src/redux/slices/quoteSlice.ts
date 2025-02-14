import { createSlice } from '@reduxjs/toolkit';
import { createQuote } from '../actions/quoteAction';


interface QuoteState {
  quotes: Quote[];
  quote: Quote | null;
  monthlyRequest : any;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: QuoteState = {
  quotes: [],
  quote: null,
  monthlyRequest: null,
  loading: false,
  error: null,
  status: "idle",
};


const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quote = action.payload;
      })
      .addCase(createQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create quote';
      })
        
  }

});

export default quoteSlice.reducer;
