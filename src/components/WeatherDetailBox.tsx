import React, { useState } from "react";
import { getWeatherStatus, type StatusColor } from "../utilities/weatherStatus";

interface WeatherDetailBoxProps {
  iconSrc: string;
  text: string | number;
  label: string;
  param: string;
  value: number;
  sizeClass?: string;
}

const WeatherDetailBox: React.FC<WeatherDetailBoxProps> = ({
  iconSrc,
  text,
  label,
  param,
  value,
  sizeClass = "w-10 h-10",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const statusColor: StatusColor = getWeatherStatus(param, value);

  const getTextColorClass = () => {
    switch (statusColor) {
      case "bad":
        return "text-yellow-500";
      case "critical":
        return "text-red-500";
      case "normal":
      default:
        return "text-white";
    }
  };

  const getIconFilterClass = () => {
    switch (statusColor) {
      case "bad":
        return "filter-yellow";
      case "critical":
        return "filter-red";
      case "normal":
      default:
        return "filter-white";
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center bg-gray-700 p-2 rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={iconSrc}
        alt={label}
        className={`${sizeClass} mb-2 ${getIconFilterClass()}`}
      />
      <p className={`text-md font-semibold ${getTextColorClass()}`}>{text}</p>
      {isHovered && (
        <div className="absolute -top-8 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );
};

export default WeatherDetailBox;
