import { configureStore } from '@reduxjs/toolkit';
import twoFaSlice from './twoFaSlice';

export const store = configureStore({
  reducer: {
    twoFactor: twoFaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
