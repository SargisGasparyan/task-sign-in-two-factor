import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TwoFaState {
  twoFaCode: string[];
}

const initialState: TwoFaState = {
  twoFaCode: ["", "", "", "", "", ""],
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
    },
  },
});

export const { setTwoFa, resetTwoFA } = twoFactor.actions;
export default twoFactor.reducer;
