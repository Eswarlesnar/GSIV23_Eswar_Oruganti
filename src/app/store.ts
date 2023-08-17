import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';

export const store = configureStore({
  reducer: {
    // reducerss
     movies : moviesReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;