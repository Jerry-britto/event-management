import { configureStore } from "@reduxjs/toolkit"; 
import eventReducer from "./slice.js";
export const store = configureStore({
  reducer: eventReducer,
});
