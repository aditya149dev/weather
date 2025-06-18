import { useState, useEffect, useCallback, useRef } from "react";
import type { WeatherData } from "../components/WeatherCard";
import { getMockWeatherData } from "../services/mockWeatherService";

const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const weatherDataRef = useRef(weatherData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationQuery, setLocationQuery] = useState<string>("fetch:ip");

  useEffect(() => {
    weatherDataRef.current = weatherData;
  }, [weatherData]);

  const fetchWeatherData = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!API_KEY) {
        setWeatherData(getMockWeatherData() as WeatherData);
      } else {
        const apiUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${query}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: WeatherData = await response.json();

        if (data.error) {
          throw new Error(data.error.info);
        }
        setWeatherData(data);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      if (weatherDataRef.current === null) {
        setWeatherData(getMockWeatherData() as WeatherData);
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
