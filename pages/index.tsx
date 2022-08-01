import Seo from "components/layout/Seo";
import { useState } from "react";
import type { NextPage } from "next";
import dfsXyConv from "components/functions/dfsXyConv";
import TodayWeather from "components/common/MainWeather/TodayWeather";
import FutureWeather from "components/common/FutureWeather/FutureWeather";
import Nav from "components/layout/MainWeather/Nav";
import Suspense from "components/common/Suspense";
import BoxSK from "components/common/FutureWeather/skeleton/BoxSK";
import Image from "next/image";

const Home: NextPage = () => {
  const { defaultLatitude, defaultLongitude } = {
    defaultLatitude: 35.1530444,
    defaultLongitude: 128.1010899,
  };
  const [currentLat, setCurrentLat] = useState(defaultLatitude);
  const [currentLng, setCurrentLng] = useState(defaultLongitude);
  const todayPosition = { latitude: currentLat, longitude: currentLng };
  const { x, y } = dfsXyConv("toXY", currentLat, currentLng);
  const position = { x, y };

  return (
    <>
      <div className="w-screen h-screen flex justify-center overflow-hidden text-white font-sans">
        <div className="w-full h-full max-w-4xl">
          <Seo title="오늘의 날씨" />
          <Nav setCurrentLat={setCurrentLat} setCurrentLng={setCurrentLng} />
          <TodayWeather position={todayPosition} />
          <div className="flex justify-center relative">
            <Image
              src="/images/mascot/gnu-basic.png"
              alt="gnu-mascot"
              width={300}
              height={400}
            />
          </div>
          <Suspense fallback={<BoxSK />}>
            <FutureWeather position={position} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Home;
