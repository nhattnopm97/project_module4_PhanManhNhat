import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import songhandled from "./songChangeSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { auth: authSlice, changeSong: songhandled }, // Hành động của reducer
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
