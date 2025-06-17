import refreshIcon from "../assets/refresh.svg";
import { useState, useEffect } from "react";
import SunriseSunsetDisplay from "./SunriseSunsetDisplay";
import WeatherDetailBox from "./WeatherDetailBox";
import humidityIcon from "../assets/humidity.svg";
import windIcon from "../assets/wind.svg";
import maskIcon from "../assets/mask.svg";
import binocularsIcon from "../assets/binoculars.svg";
import uvIcon from "../assets/uv.svg";
import rainIcon from "../assets/rain.svg";
import { convertUTCToLocal } from "../utilities/timeConverter";

export interface WeatherData {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: number;
    };
    air_quality: {
      co: string;
      no2: string;
      o3: string;
      so2: string;
      pm2_5: string;
      pm10: string;
      "us-epa-index": string;
      "gb-defra-index": string;
    };
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
  };
  success?: boolean;
  error?: {
    code: number;
    type: string;
    info: string;
  };
}

interface WeatherCardProps {
  weatherData: WeatherData;
  onRefresh: () => void;
  isLoading: boolean;
  onSearch: (query: string) => void;
}

const WeatherCard = ({
  weatherData,
  onRefresh,
  isLoading,
  onSearch,
}: WeatherCardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFeelsLikeHovered, setIsFeelsLikeHovered] = useState(false);
  const [localObservationTime, setLocalObservationTime] = useState("");

  useEffect(() => {
    if (weatherData.current.observation_time) {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setLocalObservationTime(
        convertUTCToLocal(weatherData.current.observation_time, userTimeZone)
      );
    }
  }, [weatherData.current.observation_time, weatherData]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    } else {
      onSearch("fetch:ip");
    }
  };

  return (
    <div className="bg-gray-800 pt-2 px-4 pb-4 rounded-lg shadow-lg max-w-md w-full text-center relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center rounded-lg z-10">
          <p className="text-lg font-semibold text-white">Loading...</p>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">{localObservationTime}</div>
        <button
          onClick={onRefresh}
          className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none"
          aria-label="Refresh Weather"
        >
          <img
            src={refreshIcon}
            alt="Refresh"
            className={`w-4 h-4 ${isLoading ? "animate-spin-slow" : ""}`}
          />
        </button>
      </div>
      <form onSubmit={handleSearchSubmit} className="mt-2 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search location..."
          className="w-full py-1 px-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
      </form>
      <img
        src={weatherData.current.weather_icons[0]}
        alt="Weather Icon"
        className="mx-auto mb-2"
      />
      <div className="text-lg text-gray-300 mb-5">
        {weatherData.current.weather_descriptions[0]}
      </div>
      <p className="text-4xl font-semibold mb-3 text-white">
        {weatherData.current.temperature}°C
        <span
          className="text-sm text-gray-400 relative inline-block ml-3"
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
      <h2 className="text-2xl font-bold mb-0.5 text-white">
        {weatherData.location.name}
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        {new Date(weatherData.location.localtime).toLocaleDateString([], {
          weekday: "long",
        })}{" "}
        {new Date(weatherData.location.localtime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
        <SunriseSunsetDisplay
          localtime={weatherData.location.localtime}
          sunrise={weatherData.current.astro.sunrise}
          sunset={weatherData.current.astro.sunset}
          className="ml-2"
        />
      </p>
      <div className="mt-6 grid grid-cols-3 gap-3 text-left">
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
          value={parseInt(weatherData.current.air_quality["us-epa-index"])}
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
  );
};

export default WeatherCard;
