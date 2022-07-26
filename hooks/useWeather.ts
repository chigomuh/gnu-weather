import getChodangiyebo from "components/functions/getChodangiyebo";
import plusZero from "components/functions/plusZero";
import useSWR from "swr";

export interface Categories {
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

export interface Item {
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
      ? `${plusZero(today.getHours() - 1)}30`
      : `${plusZero(today.getHours())}30`;

  const nowTime = (Number(baseTime) + 70).toString();

  const url = `${DEV}/api/weather?baseDate=${baseDate}&baseTime=${baseTime}&nx=${nx}&ny=${ny}&type=${type}`;

  const { data, error } = useSWR(url, fetcher);
  const failReturnData = {
    data,
    success: false,
    isLoading: !error && !data,
    isError: error,
  };

  if (data && data.data.response.body) {
    if (type === "chodangiyebo") {
      const items = data.data.response.body.items.item;
      const mainYebo = getChodangiyebo(items, nowTime);

      if (mainYebo.success) {
        return {
          data: mainYebo.data,
          success: true,
          isLoading: !error && !data,
          isError: error,
        };
      } else {
        return failReturnData;
      }
    } else {
      return failReturnData;
    }
  } else {
    return failReturnData;
  }
};

export default useWeather;
