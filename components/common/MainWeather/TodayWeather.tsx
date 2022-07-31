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
import Image from "next/image";

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
      <div>
        <div className="space-y-2">
          <ErrorBoundary>
            <Suspense fallback={<AddressNameSK />}>
              <AddressName lat={lat} lng={lng} />
            </Suspense>
          </ErrorBoundary>
          <div className="flex justify-center relative">
            <Image
              src="/images/mascot/gnu-basic.png"
              width={200}
              height={200}
              alt="gnu-mascot"
            />
          </div>
          <ErrorBoundary>
            <Suspense fallback={<WeatherSK />}>
              <Weather x={x} y={y} />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary>
            <Suspense fallback={<DustSK />}>
              <Dust lat={lat} lng={lng} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default TodayWeather;
