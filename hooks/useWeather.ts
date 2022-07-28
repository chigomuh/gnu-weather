import getBaseDateTime from "components/functions/getBaseDateTime";
import getChodangisil from "components/functions/getChodangisil";
import getNowTime from "components/functions/getNowTime";
import useSWR from "swr";

export interface Categories {
  LGT: string;
  PTY: string;
  REH: string;
  RN1: string;
  SKY: string;
  T1H: string;
  UUU: string;
  VEC: string;
  VVV: string;
  WSD: string;
  DIF?: string;
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

export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("Error, fetching the data");
    throw error;
  }

  return response.json();
};

const useWeather = (nx: number, ny: number) => {
  const type = "chodangisil";
  const { baseDate, baseTime } = getBaseDateTime(type);
  const nowTime = getNowTime(baseTime);

  const url = `/api/weather?baseDate=${baseDate}&baseTime=${baseTime}&nx=${nx}&ny=${ny}&type=${type}`;

  const { data, error } = useSWR(url, fetcher);
  const failReturnData = {
    data: undefined,
    success: false,
    isLoading: !error && !data,
    isError: error,
  };

  if (data && data.data.response.body) {
    const items = data.data.response.body.items.item;
    const itemsY = data.dataY.response.body.items.item;
    const itemsSky = data.dataSky.response.body.items.item;
    const mainSil = getChodangisil(items, itemsY, itemsSky, nowTime);

    return {
      data: mainSil.data,
      success: true,
      isLoading: !error && !data,
      isError: error,
    };
  } else {
    return failReturnData;
  }
};

export default useWeather;
