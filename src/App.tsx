import { useState, useEffect, useCallback } from "react";
import WeatherCard from "./components/WeatherCard";
import type { WeatherData } from "./components/WeatherCard";
import { getMockWeatherData } from "./mockService";

const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationQuery, setLocationQuery] = useState<string>("fetch:ip");

  const fetchWeatherData = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!API_KEY) {
        const data: WeatherData = getMockWeatherData();
        setWeatherData(data);
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
      //setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData(locationQuery);
  }, [fetchWeatherData, locationQuery]);

  const handleSearch = useCallback(
    (newQuery: string) => {
      setLocationQuery(newQuery);
      fetchWeatherData(newQuery);
    },
    [fetchWeatherData]
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      {
        /*error &&*/ <p className="text-red-400 text-lg font-semibold mb-4">
          {error}
        </p>
      }
      {weatherData ? (
        <div className="relative">
          <WeatherCard
            weatherData={weatherData}
            onRefresh={() => fetchWeatherData(locationQuery)}
            isLoading={isLoading}
            onSearch={handleSearch}
          />
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
