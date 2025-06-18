export type StatusColor = "normal" | "bad" | "critical";

export const getWeatherStatus = (param: string, value: number): StatusColor => {
  switch (param) {
    case "wind_speed":
      if (value >= 90) return "critical";
      if (value >= 60) return "bad";
      return "normal";
    case "humidity":
      if (value <= 15 || value >= 85) return "critical";
      if ((value > 15 && value < 30) || (value > 70 && value < 85))
        return "bad";
      return "normal";
    case "precip":
      if (value >= 50) return "critical";
      if (value >= 20) return "bad";
      return "normal";
    case "visibility":
      if (value < 1) return "critical";
      if (value <= 5) return "bad";
      return "normal";
    case "us-epa-index":
      if (value >= 4) return "critical";
      if (value === 3) return "bad";
      return "normal";
    case "uv_index":
      if (value >= 11) return "critical";
      if (value >= 6) return "bad";
      return "normal";
    default:
      return "normal";
  }
};
