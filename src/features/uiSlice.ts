import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  language: string;
  mode: string;
}

const initialState: UiState = {
  language: "en",
  mode: "dark",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
  },
});

export const { setLanguage, setMode } = uiSlice.actions;
export default uiSlice.reducer;
