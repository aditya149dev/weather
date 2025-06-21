import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

interface GeminiState {
  chatGeminiResponse: string | null;
  summaryGeminiResponse: string | null;
  isLoading: boolean;
  error: string | null;

  chatInputText: string | "";
  summarySelectedFile: File | null;
}

const initialState: GeminiState = {
  chatGeminiResponse: null,
  summaryGeminiResponse: null,
  isLoading: false,
  error: null,

  chatInputText: "",
  summarySelectedFile: null,
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
    changeIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    changeError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    changeChatInputText: (state, action: PayloadAction<string | "">) => {
      state.chatInputText = action.payload;
    },
    changeSummarySelectedFile: (state, action: PayloadAction<File | null>) => {
      state.summarySelectedFile = action.payload;
    },
  },
});

export const {
  changeGeminiChatResponse,
  changeGeminiSummaryResponse,
  changeIsLoading,
  changeError,
  changeChatInputText,
  changeSummarySelectedFile,
} = geminiSlice.actions;

export const selectGeminiChatResponse = (state: RootState) =>
  state.gemini.chatGeminiResponse;
export const selectGeminiSummaryResponse = (state: RootState) =>
  state.gemini.summaryGeminiResponse;
export const selectIsGeminiLoading = (state: RootState) =>
  state.gemini.isLoading;
export const selectGeminiError = (state: RootState) => state.gemini.error;

export const selectChatInputText = (state: RootState) =>
  state.gemini.chatInputText;
export const selectSummarySelectedFile = (state: RootState) =>
  state.gemini.summarySelectedFile;

export default geminiSlice.reducer;
