import { useState, useEffect, useCallback } from "react";
import type { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationQuery, setLocationQuery] = useState<string>("fetch:ip");

  const fetchWeatherData = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      if (!API_KEY) {
        throw new Error("API Key is not set.");
      }
      const apiUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${query}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.info);
      }
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (locationQuery) {
      fetchWeatherData(locationQuery);
    }
  }, [fetchWeatherData, locationQuery]);

  const handleSearch = useCallback(
    (newQuery: string) => {
      setLocationQuery(newQuery);
      fetchWeatherData(newQuery);
    },
    [fetchWeatherData]
  );

  return {
    weatherData,
    isLoading,
    error,
    handleSearch,
    locationQuery,
    fetchWeatherData,
  };
};
