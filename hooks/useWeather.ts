import plusZero from "components/functions/plusZero";
import useSWR from "swr";

interface Categories {
  [index: string]: string | undefined;
  LGT?: string;
  PTY?: string;
  REH?: string;
  RN1?: string;
  SKY?: string;
  T1H?: string;
  UUU?: string;
  VEC?: string;
  VVV?: string;
  WSD?: string;
}

interface Item {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

const DEV = "http://localhost:3000";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("Error, fetching the data");
    throw error;
  }

  return response.json();
};

const useWeather = (
  nx: number,
  ny: number,
  type: "chodangisil" | "chodangiyebo" | "dangi" = "chodangiyebo"
) => {
  const today = new Date(Date.now());
  const baseDate = `${today.getFullYear()}${plusZero(
    today.getMonth() + 1
  )}${plusZero(today.getDate())}`;
  const baseTime =
    today.getMinutes() < 30
      ? `${plusZero(today.getHours() - 1)}00`
      : `${plusZero(today.getHours())}00`;

  const url = `${DEV}/api/weather?baseDate=${baseDate}&baseTime=${baseTime}&nx=${nx}&ny=${ny}&type=${type}`;

  const { data, error } = useSWR(url, fetcher);

  if (data && data.data.response.body) {
    let weatherData = {};
    const items = data.data.response.body.items.item;
    const categories: Categories = {};
    const dates: {
      [key: string]: {};
    } = {};
    const times: {
      [key: string]: {};
    } = {};

    items.forEach((item: Item) => {
      categories[item.category] = item.fcstValue;
      dates[item.fcstDate] = {
        ...times,
      };
      times[item.fcstTime] = {
        ...categories,
      };

      weatherData = {
        fcstDates: {
          ...dates,
        },
        nx: item.nx,
        ny: item.ny,
      };
    });

    return {
      data: weatherData,
      success: true,
      isLoading: !error && !data,
      isError: error,
    };
  } else {
    return {
      data,
      success: false,
      isLoading: !error && !data,
      isError: error,
    };
  }
};

export default useWeather;
