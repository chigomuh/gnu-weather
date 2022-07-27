import { Item } from "hooks/useWeather";

interface WeatherData {
  PCP?: string;
  POP?: string;
  PTY?: string;
  REH?: string;
  SKY?: string;
  SNO?: string;
  TMP?: string;
  UUU?: string;
  VEC?: string;
  VVV?: string;
  WAV?: string;
  WSD?: string;
  fcstDate: string;
  fcstTime: string;
  nx: number;
  ny: number;
}

const getDangi = (items: Item[]) => {
  const data = [...items];
  const result: {
    [key: string]: {
      [key: string]: {
        [key: string]: string | number;
        fcstDate: string;
        fcstTime: string;
        nx: number;
        ny: number;
      };
    };
  } = {};
  const today = new Date(Date.now());
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const date = item.fcstDate;
    const time = item.fcstTime;
    const timeCo = Number(time);
    if (date === "20220727" && timeCo <= today.getHours() * 100) {
      continue;
    }
    if (result[date] === undefined) result[date] = {};
    if (result[date][time] === undefined)
      result[date][time] = {
        fcstDate: "",
        fcstTime: "",
        nx: 0,
        ny: 0,
      };
    result[date][time][item.category] = item.fcstValue;
    result[date][time]["fcstDate"] = date;
    result[date][time]["fcstTime"] = time;
    result[date][time]["nx"] = item.nx;
    result[date][time]["ny"] = item.ny;
  }

  let weatherData: WeatherData[] = [];

  for (let key in result) {
    const value = Object.keys(result[key]).sort();

    value.forEach((valueKey) => {
      weatherData = [...weatherData, result[key][valueKey]];
    });
  }

  if (weatherData.length !== 0) {
    return {
      data: weatherData,
      success: true,
    };
  } else {
    return {
      data: undefined,
      success: false,
    };
  }
};

export default getDangi;
