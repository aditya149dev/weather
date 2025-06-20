import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";
import type { WeatherData } from "../../types/weather";

interface WeatherState {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  locationQuery: string;
}

const initialState: WeatherState = {
  weatherData: null,
  isLoading: false,
  error: null,
  locationQuery: "fetch:ip",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    changeLocationQuery: (state, action: PayloadAction<string>) => {
      state.locationQuery = action.payload;
    },
    fetchWeatherStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.weatherData = null;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<WeatherData>) => {
      state.isLoading = false;
      state.weatherData = action.payload;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  changeLocationQuery,
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} = weatherSlice.actions;

export const selectWeatherData = (state: RootState) =>
  state.weather.weatherData;
export const selectIsLoading = (state: RootState) => state.weather.isLoading;
export const selectError = (state: RootState) => state.weather.error;
export const selectLocationQuery = (state: RootState) =>
  state.weather.locationQuery;

export default weatherSlice.reducer;
