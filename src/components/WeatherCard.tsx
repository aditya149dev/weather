import { useState, useMemo } from "react";
import SunriseSunset from "./SunriseSunset";
import WeatherDetailBox from "./WeatherDetailBox";
import { convertUTCToLocal } from "../utilities/timeConverter";
import refreshIcon from "../assets/refresh.svg";
import humidityIcon from "../assets/humidity.svg";
import windIcon from "../assets/wind.svg";
import maskIcon from "../assets/mask.svg";
import binocularsIcon from "../assets/binoculars.svg";
import uvIcon from "../assets/uv.svg";
import rainIcon from "../assets/rain.svg";
import { useAppDispatch } from "../redux/hooks";
import { changeLocationQuery } from "../features/input/inputSlice";
import type { WeatherData } from "../types/weather";

interface WeatherCardProps {
  weatherData: WeatherData | null;
  error: string | null;
  isLoading: boolean;
  onRefresh: () => void;
}

const WeatherCard = ({
  weatherData,
  error,
  isLoading,
  onRefresh,
}: WeatherCardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFeelsLikeHovered, setIsFeelsLikeHovered] = useState(false);

  const dispatch = useAppDispatch();
  const changeQuery = (query: string) => dispatch(changeLocationQuery(query));

  const localObservationTime = useMemo(() => {
    if (weatherData?.current.observation_time) {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return convertUTCToLocal(
        weatherData.current.observation_time,
        userTimeZone
      );
    }
    return "";
  }, [weatherData]);

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      changeQuery(query);
    }
  };

  if (isLoading) {
    return (
      <p className="text-lg font-semibold text-white max-w-md mx-auto">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-lg font-semibold text-red-400 max-w-md mx-auto">
        {error}
      </p>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="bg-gray-800 pt-2 px-4 pb-4 rounded-lg shadow-lg max-w-md lg:[@media(max-height:600px)]:max-w-4xl w-full text-center lg:[@media(max-height:600px)]:text-left relative">
      <>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-400">{localObservationTime}</div>
          <button
            onClick={onRefresh}
            className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none cursor-pointer"
            aria-label="Refresh Weather"
          >
            <img
              src={refreshIcon}
              alt="Refresh"
              className={`w-4 h-4 ${
                isLoading ? "animate-[spin_1s_linear_infinite]" : ""
              }`}
            />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit(searchQuery);
          }}
          className="w-full mb-2"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location..."
            className="w-full py-1 px-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
        </form>
        <div className="lg:[@media(max-height:600px)]:flex lg:[@media(max-height:600px)]:gap-8">
          <div className="lg:[@media(max-height:600px)]:w-1/2 lg:[@media(max-height:600px)]:flex-none">
            <div className="flex flex-col items-center lg:[@media(max-height:600px)]:flex-row lg:[@media(max-height:600px)]:items-center lg:[@media(max-height:600px)]:gap-4">
              <img
                src={weatherData.current.weather_icons[0]}
                alt="Weather Icon"
                className="w-24 h-24 lg:[@media(max-height:600px)]:w-32 lg:[@media(max-height:600px)]:h-32 mb-2 lg:[@media(max-height:600px)]:mb-0"
              />
              <div className="text-center">
                <div className="text-lg text-gray-300 mb-1 lg:[@media(max-height:600px)]:mb-6">
                  {weatherData.current.weather_descriptions[0]}
                </div>
                <p className="text-4xl font-semibold text-white lg:[@media(max-height:600px)]:flex lg:[@media(max-height:600px)]:flex-col lg:[@media(max-height:600px)]:items-center lg:[@media(max-height:600px)]:leading-none">
                  <span>{weatherData.current.temperature}°C</span>
                  <span
                    className="text-sm text-gray-400 relative inline-block ml-3 lg:[@media(max-height:600px)]:ml-0 lg:[@media(max-height:600px)]:mt-2"
                    onMouseEnter={() => setIsFeelsLikeHovered(true)}
                    onMouseLeave={() => setIsFeelsLikeHovered(false)}
                  >
                    {" "}
                    ({weatherData.current.feelslike}°C)
                    {isFeelsLikeHovered && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                        Feels Like
                      </div>
                    )}
                  </span>
                </p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mt-4 mb-0.5 text-white lg:[@media(max-height:600px)]:mb-2 lg:[@media(max-height:600px)]:mt-6 text-center">
              {weatherData.location.name}
            </h2>
            <div className="text-sm text-gray-400 mb-4 lg:[@media(max-height:600px)]:flex lg:[@media(max-height:600px)]:flex-col lg:[@media(max-height:600px)]:items-center">
              <span>
                {new Date(weatherData.location.localtime).toLocaleDateString(
                  [],
                  {
                    weekday: "long",
                  }
                )}{" "}
                {new Date(weatherData.location.localtime)
                  .toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .toUpperCase()}
              </span>
              <SunriseSunset
                localtime={weatherData.location.localtime}
                sunrise={weatherData.current.astro.sunrise}
                sunset={weatherData.current.astro.sunset}
                className="ml-2 sm:ml-4 lg:[@media(max-height:600px)]:ml-0 lg:[@media(max-height:600px)]:mt-1"
              />
            </div>
          </div>
          <div className="lg:[@media(max-height:600px)]:w-1/2">
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:[@media(max-height:600px)]:grid-cols-2 gap-3 text-left lg:[@media(max-height:600px)]:mt-0">
              <WeatherDetailBox
                iconSrc={windIcon}
                text={`${weatherData.current.wind_speed} km/h`}
                label={`Wind: ${weatherData.current.wind_degree}° ${weatherData.current.wind_dir}`}
                param="wind_speed"
                value={weatherData.current.wind_speed}
              />
              <WeatherDetailBox
                iconSrc={rainIcon}
                text={`${weatherData.current.precip} mm`}
                label="Precipitation"
                param="precip"
                value={weatherData.current.precip}
              />
              <WeatherDetailBox
                iconSrc={maskIcon}
                text={`${weatherData.current.air_quality["us-epa-index"]}`}
                label="Air Quality: us-epa-index"
                param="us-epa-index"
                value={parseInt(
                  weatherData.current.air_quality["us-epa-index"]
                )}
              />
              <WeatherDetailBox
                iconSrc={binocularsIcon}
                text={`${weatherData.current.visibility} km`}
                label="Visibility"
                param="visibility"
                value={weatherData.current.visibility}
              />
              <WeatherDetailBox
                iconSrc={humidityIcon}
                text={`${weatherData.current.humidity}%`}
                label="Humidity"
                param="humidity"
                value={weatherData.current.humidity}
              />
              <WeatherDetailBox
                iconSrc={uvIcon}
                text={`${weatherData.current.uv_index}`}
                label="UV Index"
                param="uv_index"
                value={weatherData.current.uv_index}
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default WeatherCard;
