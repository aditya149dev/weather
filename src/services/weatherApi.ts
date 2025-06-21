import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.weatherstack.com/",
    validateStatus: (response, result) => {
      // API returns 200 even for errors, with error details in the JSON
      return response.status === 200 && !("error" in (result as WeatherData));
    },
  }),
  endpoints: (builder) => ({
    weather: builder.query<WeatherData, string>({
      query: (query) => `current?access_key=${API_KEY}&query=${query}`,
    }),
  }),
});

export const { useWeatherQuery } = weatherApi;
