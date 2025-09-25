import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TwoFaState {
  twoFaCode: string[];
  showCountdown: boolean;
  isWriting: boolean; // new flag
}

const initialState: TwoFaState = {
  twoFaCode: ["", "", "", "", "", ""],
  showCountdown: true,
  isWriting: false, // initial value
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
      state.showCountdown = false;
      state.isWriting = false; // reset writing flag too
    },

    setShowCountdown: (state, action: PayloadAction<boolean>) => {
      state.showCountdown = action.payload;
    },

    setIsWriting: (state, action: PayloadAction<boolean>) => {
      state.isWriting = action.payload; // new reducer
    },
  },
});

export const { setTwoFa, resetTwoFA, setShowCountdown, setIsWriting } =
  twoFactor.actions;
export default twoFactor.reducer;
