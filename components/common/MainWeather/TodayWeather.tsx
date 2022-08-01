import { Position } from "hooks/useCurrentPosition";
import Dust from "components/common/MainWeather/Dust";
import Weather from "components/common/MainWeather/Weather";
import AddressName from "components/common/MainWeather/AddressName";
import Suspense from "components/common/Suspense";
import { useEffect, useState } from "react";
import dfsXyConv from "components/functions/dfsXyConv";
import WeatherSK from "components/common/MainWeather/skeleton/WeatherSK";
import DustSK from "components/common/MainWeather/skeleton/DustSK";
import AddressNameSK from "components/common/MainWeather/skeleton/AddressNameSK";
import ErrorBoundary from "components/common/ErrorBoundary";

interface Props {
  position: Position;
}

const TodayWeather = ({ position }: Props) => {
  const { latitude, longitude } = position;
  const lat = latitude ?? 35.1530444;
  const lng = longitude ?? 128.1010899;
  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLng, setCurrentLng] = useState(lng);
  const { x, y } = dfsXyConv("toXY", currentLat, currentLng);

  useEffect(() => {
    setCurrentLat(lat);
    setCurrentLng(lng);
  }, [lat, lng]);

  return (
    <>
      <div className="flex w-full justify-center items-center z-40">
        <div className="w-full max-w-4xl relative">
          <div className="flex justify-between mt-14">
            <ErrorBoundary>
              <Suspense fallback={<AddressNameSK />}>
                <AddressName lat={lat} lng={lng} />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
              <Suspense fallback={<DustSK />}>
                <Dust lat={lat} lng={lng} />
              </Suspense>
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <Suspense fallback={<WeatherSK />}>
              <Weather x={x} y={y} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default TodayWeather;
