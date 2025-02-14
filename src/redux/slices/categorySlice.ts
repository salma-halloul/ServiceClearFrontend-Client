import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCategories } from '../actions/categoryAction';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  status: "idle",
};


const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
        state.status = "failed";
      })

  },
});

export default categorySlice.reducer;
