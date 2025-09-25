import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// интерфейс состояния
interface AuthState {
  email: string;
  password: string;
  twoFa: boolean;
}

// начальное состояние
const initialState: AuthState = {
  email: "",
  password: "",
  twoFa: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setTwoFa: (state, action: PayloadAction<boolean>) => {
      state.twoFa = action.payload;
    },
    resetAuth: () => initialState, // сброс всех полей
  },
});

export const { setEmail, setPassword, setTwoFa, resetAuth } = authSlice.actions;
export default authSlice.reducer;
