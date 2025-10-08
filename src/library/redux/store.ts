import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import courseReducer from './courseSlice'

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
