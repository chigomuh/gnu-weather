import dfsXyConv from "components/functions/dfsXyConv";
import { Position } from "hooks/useCurrentPosition";
import useWeather, { fetcher } from "hooks/useWeather";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Dust from "components/common/MainWeather/Dust";
import Weather from "components/common/MainWeather/Weather";

interface Props {
  position: Position;
}

interface DustData {
  success: boolean;
  data: {
    pm10: string;
    pm25: string;
    station: string;
  };
}

const URL_ORIGIN = process.env.NEXT_PUBLIC_URL_ORIGIN;

const TodayWeather = ({ position }: Props) => {
  const { latitude, longitude } = position;
  const lat = latitude ?? 35.1530444;
  const lng = longitude ?? 128.1010899;
  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLng, setCurrentLng] = useState(lng);

  const { x, y } = dfsXyConv("toXY", currentLat, currentLng);
  const { data: weatherData, isLoading, isError } = useWeather(x, y);

  const { data: dustData, error: dustError } = useSWR<DustData>(
    `${URL_ORIGIN}/api/dust?lat=${lat}&lng=${lng}`,
    fetcher
  );

  useEffect(() => {
    setCurrentLat(lat);
    setCurrentLng(lng);
  }, [lat, lng]);

  return (
    <>
      <div>
        <div className="space-y-2">
          {weatherData && <Weather category={weatherData.categories} />}
          {dustData && (
            <Dust pm10={+dustData.data.pm10} pm25={+dustData.data.pm25} />
          )}
        </div>
      </div>
    </>
  );
};

export default TodayWeather;
