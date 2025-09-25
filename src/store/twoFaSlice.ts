import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TwoFaState {
  twoFaCode: string[];
  showCountdown: boolean; // добавляем поле
}

const initialState: TwoFaState = {
  twoFaCode: ["", "", "", "", "", ""],
  showCountdown: false, // начальное значение
};

const twoFactor = createSlice({
  name: "twoFa",
  initialState,
  reducers: {
    setTwoFa: (state, action: PayloadAction<string[]>) => {
      state.twoFaCode = action.payload;
    },

    resetTwoFA: (state) => {
      state.twoFaCode = ["", "", "", "", "", ""];
      state.showCountdown = false; // сбрасываем таймер тоже
    },

    setShowCountdown: (state, action: PayloadAction<boolean>) => {
      state.showCountdown = action.payload;
    },
  },
});

export const { setTwoFa, resetTwoFA, setShowCountdown } = twoFactor.actions;
export default twoFactor.reducer;
