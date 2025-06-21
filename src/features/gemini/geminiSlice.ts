import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

interface GeminiState {
  chatGeminiResponse: string | null;
  summaryGeminiResponse: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: GeminiState = {
  chatGeminiResponse: null,
  summaryGeminiResponse: null,
  isLoading: false,
  error: null,
};

export const geminiSlice = createSlice({
  name: "gemini",
  initialState,
  reducers: {
    changeGeminiChatResponse: (state, action: PayloadAction<string | null>) => {
      state.chatGeminiResponse = action.payload;
    },
    changeGeminiSummaryResponse: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.summaryGeminiResponse = action.payload;
    },
    changeGeminiIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    changeGeminiError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  changeGeminiChatResponse,
  changeGeminiSummaryResponse,
  changeGeminiIsLoading,
  changeGeminiError,
} = geminiSlice.actions;

export const selectGeminiChatResponse = (state: RootState) =>
  state.gemini.chatGeminiResponse;
export const selectGeminiSummaryResponse = (state: RootState) =>
  state.gemini.summaryGeminiResponse;
export const selectGeminiIsLoading = (state: RootState) =>
  state.gemini.isLoading;
export const selectGeminiError = (state: RootState) => state.gemini.error;

export default geminiSlice.reducer;
