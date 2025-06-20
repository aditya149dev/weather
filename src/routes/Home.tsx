import { Link } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import { useWeather } from "../hooks/useWeather";

const Home = () => {
  const {
    weatherData,
    isLoading,
    error,
    handleSearch,
    locationQuery,
    fetchWeatherData,
  } = useWeather();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <Link
        to="/ai"
        className="absolute top-4 left-4 p-1 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none text-white text-sm font-bold min-w-[3rem] flex items-center justify-center"
      >
        AI
      </Link>
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <WeatherCard
            weatherData={weatherData}
            onRefresh={() => fetchWeatherData(locationQuery)}
            isLoading={isLoading}
            onSearch={handleSearch}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
