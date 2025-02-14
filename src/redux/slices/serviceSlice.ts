import { createSlice } from '@reduxjs/toolkit';
import { fetchServiceById, fetchServices, fetchServicesByCategory } from '../actions/serviceAction';

interface ServiceState {
  services: Service[];
  service: Service | null;
  servicesByCategory: Service[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ServiceState = {
  services: [],
  servicesByCategory: [],
  service: null,
  loading: false,
  error: null,
  status: "idle",
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        state.status = "idle";
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch service';
        state.status = "failed";
      })
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
        state.status = "idle";
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
        state.status = "failed";
      })
      .addCase(fetchServicesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchServicesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.servicesByCategory = action.payload;
        state.status = "idle";
      })
      .addCase(fetchServicesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
        state.status = "failed";
      });
      
  },
});

export default serviceSlice.reducer;
