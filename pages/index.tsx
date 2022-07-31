import Seo from "components/layout/Seo";
import { useState } from "react";
import type { NextPage } from "next";
import dfsXyConv from "components/functions/dfsXyConv";
import TodayWeather from "components/common/MainWeather/TodayWeather";
import FutureWeather from "components/common/FutureWeather/FutureWeather";
import Nav from "components/layout/MainWeather/Nav";
import Suspense from "components/common/Suspense";
import BoxSK from "components/common/FutureWeather/skeleton/BoxSK";

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
      <Seo title="Home" />
      <Nav setCurrentLat={setCurrentLat} setCurrentLng={setCurrentLng} />
      <div className="space-y-10">
        <TodayWeather position={todayPosition} />
        <Suspense fallback={<BoxSK />}>
          <FutureWeather position={position} />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
