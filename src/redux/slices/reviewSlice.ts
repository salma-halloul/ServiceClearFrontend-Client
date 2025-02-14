import { createSlice } from '@reduxjs/toolkit';
import {fetchReviews } from '../actions/reviewAction';

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
  status: "idle",
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";

      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.status = "idle";
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch reviews';
        state.status = "failed";
      })
      
  },
});

export default reviewSlice.reducer;