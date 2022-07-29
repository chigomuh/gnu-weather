import useFutureWeather from "hooks/useFutureWeather";
import React, { useState } from "react";
import Weather from "components/common/FutureWeather/Weather";
import Precipitation from "./Precipitation";
import Windy from "./Windy";
import Humidity from "./Humidity";

interface Props {
  position: {
    x: number;
    y: number;
  };
}

const FutureWeather = ({ position }: Props) => {
  const [currenOpenTap, setCurrenOpenTap] = useState("weather");
  const { x, y } = position;
  const { data, isLoading, isError } = useFutureWeather(x, y);

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;
  return (
    <>
      <div>
        <div className="flex">
          <div onClick={() => setCurrenOpenTap("weather")}>날씨</div>
          <div onClick={() => setCurrenOpenTap("precipitation")}>강수</div>
          <div onClick={() => setCurrenOpenTap("windy")}>바람</div>
          <div onClick={() => setCurrenOpenTap("humidity")}>습도</div>
        </div>
        {data &&
          data.map((weather) => (
            <React.Fragment key={`${weather.fcstDate}${weather.fcstTime}`}>
              <div className="flex">
                <div>날짜: {weather.fcstDate}</div>
                {currenOpenTap === "weather" && (
                  <Weather tmp={weather.TMP} sky={weather.SKY} />
                )}
                {currenOpenTap === "precipitation" && (
                  <Precipitation
                    pty={weather.PTY}
                    pop={weather.POP}
                    pcp={weather.PCP}
                  />
                )}
                {currenOpenTap === "windy" && (
                  <Windy wsd={weather.WSD} vec={weather.VEC} />
                )}
                {currenOpenTap === "humidity" && <Humidity reh={weather.REH} />}
                <div>시간: {weather.fcstTime}</div>
              </div>
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

export default FutureWeather;
