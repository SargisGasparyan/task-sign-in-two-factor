import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TwoFaState {
  twoFaCode: string[];
  showCountdown: boolean;
  isWriting: boolean;
}

const initialState: TwoFaState = {
  twoFaCode: ['', '', '', '', '', ''],
  showCountdown: true,
  isWriting: false,
};

const twoFactor = createSlice({
  name: 'twoFa',
  initialState,
  reducers: {
    setTwoFa: (state, action: PayloadAction<string[]>) => {
      state.twoFaCode = action.payload;
    },

    resetTwoFA: (state) => {
      state.twoFaCode = ['', '', '', '', '', ''];
      state.showCountdown = false;
      state.isWriting = false;
    },

    setShowCountdown: (state, action: PayloadAction<boolean>) => {
      state.showCountdown = action.payload;
    },

    setIsWriting: (state, action: PayloadAction<boolean>) => {
      state.isWriting = action.payload;
    },
  },
});

export const { setTwoFa, resetTwoFA, setShowCountdown, setIsWriting } = twoFactor.actions;
export default twoFactor.reducer;
