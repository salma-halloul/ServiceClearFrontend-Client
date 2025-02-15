import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import serviceReducer from "./slices/serviceSlice";
import categoryReducer from "./slices/categorySlice";
import reviewReducer from "./slices/reviewSlice";
import contactReducer from "./slices/contactSlice";
import quoteReducer from "./slices/quoteSlice";

const rootReducer = combineReducers({
  service: serviceReducer,
  category: categoryReducer,
  review: reviewReducer,
  contact: contactReducer,
  quote: quoteReducer,
});

// Configure le store
const store = configureStore({
  reducer: rootReducer,
});
  
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
