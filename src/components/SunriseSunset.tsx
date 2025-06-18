import { useState } from "react";
import sunIcon from "../assets/sun.svg";
import moonIcon from "../assets/moon.svg";

interface SunriseSunsetProps {
  localtime: string;
  sunrise: string;
  sunset: string;
  className?: string;
}

interface TimeDisplayProps {
  iconSrc: string;
  altText: string;
  tooltipText: string;
  time: string;
  className?: string;
}

const TimeDisplay = ({
  iconSrc,
  altText,
  tooltipText,
  time,
  className,
}: TimeDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`relative align-middle ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={iconSrc} alt={altText} className="w-4 h-4 inline-block mr-1" />
      {isHovered && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
          {tooltipText}
        </div>
      )}
      {time}
    </span>
  );
};

const SunriseSunset = ({
  localtime,
  sunrise,
  sunset,
  className,
}: SunriseSunsetProps) => {
  const localDate = new Date(localtime);
  const localDatePart = localtime.split(" ")[0];

  const sunriseToday = new Date(`${localDatePart} ${sunrise}`);
  const sunsetToday = new Date(`${localDatePart} ${sunset}`);

  if (
    localDate.getTime() < sunriseToday.getTime() ||
    localDate.getTime() >= sunsetToday.getTime()
  ) {
    return (
      <TimeDisplay
        iconSrc={sunIcon}
        altText="Sunrise"
        tooltipText="Sunrise"
        time={sunrise}
        className={className}
      />
    );
  } else {
    return (
      <TimeDisplay
        iconSrc={moonIcon}
        altText="Sunset"
        tooltipText="Sunset"
        time={sunset}
        className={className}
      />
    );
  }
};

export default SunriseSunset;
