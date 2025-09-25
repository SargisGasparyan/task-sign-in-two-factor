import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import twoFaSlice from './twoFaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    twoFactor: twoFaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
