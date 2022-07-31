import getBaseDateTime from "components/functions/getBaseDateTime";
import getDangi from "components/functions/getDangi";
import useSWR from "swr";
import { fetcher } from "./useWeather";

const URL_ORIGIN = process.env.NEXT_PUBLIC_URL_ORIGIN;

const useFutureWeather = (nx: number, ny: number) => {
  const type = "dangi";
  const { baseDate, baseTime } = getBaseDateTime(type);
  const url = `${URL_ORIGIN}/api/weather?baseDate=${baseDate}&baseTime=${baseTime}&nx=${nx}&ny=${ny}&type=${type}`;

  const { data } = useSWR(url, fetcher, { suspense: true });

  const items = data.data.response.body.items.item;
  const dangiData = getDangi(items);

  return {
    data: dangiData.data,
    success: true,
  };
};

export default useFutureWeather;
