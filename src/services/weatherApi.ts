import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://api.weatherstack.com/" }),
  endpoints: (builder) => ({
    weather: builder.query<WeatherData, string>({
      query: (query) => `current?access_key=${API_KEY}&query=${query}`,
    }),
  }),
});

export const { useWeatherQuery } = weatherApi;
