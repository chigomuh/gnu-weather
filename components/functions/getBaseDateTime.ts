import { WeatherType } from "hooks/useWeather";
import plusZero from "./plusZero";

const getBaseDateTime = (type: WeatherType) => {
  const today = new Date(Date.now());
  let baseDate = `${today.getFullYear()}${plusZero(
    today.getMonth() + 1
  )}${plusZero(today.getDate())}`;
  let baseTime =
    today.getMinutes() < 30
      ? plusZero(today.getHours() - 1)
      : plusZero(today.getHours());

  if (today.getHours() === 0 && today.getMinutes() < 30) {
    baseDate = `${today.getFullYear()}${plusZero(
      today.getMonth() + 1
    )}${plusZero(today.getDate() - 1)}`;
  }

  if (type === "chodangiyebo") {
    baseTime = baseTime + "30";
  } else if (type === "chodangisil") {
    baseTime = baseTime + "00";
  }

  return { baseDate, baseTime };
};
export default getBaseDateTime;
