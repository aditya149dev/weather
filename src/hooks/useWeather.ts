import { useCallback } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  changeLocationQuery,
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../features/weather/weatherSlice";
import type { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

export const useWeather = () => {
  const dispatch = useAppDispatch();

  const fetchWeatherData = useCallback(
    async (query: string) => {
      dispatch(fetchWeatherStart());
      try {
        if (!API_KEY) {
          throw new Error("API Key is not set.");
        }
        const apiUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${query}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: WeatherData = await response.json();

        if (data.error) {
          throw new Error(data.error.info);
        }
        dispatch(fetchWeatherSuccess(data));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchWeatherFailure(err.message));
        } else {
          dispatch(fetchWeatherFailure("An unknown error occurred."));
        }
      }
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    (newQuery: string) => {
      dispatch(changeLocationQuery(newQuery));
      fetchWeatherData(newQuery);
    },
    [dispatch, fetchWeatherData]
  );

  const handleRefresh = useCallback(
    (query: string) => {
      fetchWeatherData(query);
    },
    [fetchWeatherData]
  );

  return {
    fetchWeatherData,
    handleSearch,
    handleRefresh,
  };
};
