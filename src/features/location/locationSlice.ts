import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

interface LocationState {
  locationQuery: string;
}

const initialState: LocationState = {
  locationQuery: "",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    changeLocationQuery: (state, action: PayloadAction<string>) => {
      state.locationQuery = action.payload;
    },
  },
});

export const { changeLocationQuery } = locationSlice.actions;

export const selectLocationQuery = (state: RootState) =>
  state.location.locationQuery;

export default locationSlice.reducer;
