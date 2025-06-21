import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

interface InputState {
  locationQuery: string;
  chatInputText: string | "";
  summarySelectedFile: File | null;
}

const initialState: InputState = {
  locationQuery: "",
  chatInputText: "",
  summarySelectedFile: null,
};

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    changeLocationQuery: (state, action: PayloadAction<string>) => {
      state.locationQuery = action.payload;
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
  changeLocationQuery,
  changeChatInputText,
  changeSummarySelectedFile,
} = inputSlice.actions;

export const selectLocationQuery = (state: RootState) =>
  state.input.locationQuery;
export const selectChatInputText = (state: RootState) =>
  state.input.chatInputText;
export const selectSummarySelectedFile = (state: RootState) =>
  state.input.summarySelectedFile;

export default inputSlice.reducer;
