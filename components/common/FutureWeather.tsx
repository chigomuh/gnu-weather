import { categories } from "components/configs/weather";
import getWindDeg from "components/functions/getWindDeg";
import useFutureWeather from "hooks/useFutureWeather";
import React from "react";

interface Props {
  position: {
    x: number;
    y: number;
  };
}

const FutureWeather = ({ position }: Props) => {
  const { x, y } = position;
  const { data, isLoading, isError } = useFutureWeather(x, y);

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;
  return (
    <>
      {data &&
        data.map((weather) => (
          <React.Fragment key={`${weather.fcstDate}${weather.fcstTime}`}>
            <div className="flex">
              <div>날짜: {weather.fcstDate}</div>
              <div>시간: {weather.fcstTime}</div>
              <div>기온: {weather.TMP}℃</div>
              <div>
                하늘상태: {categories.dangi.SKY.code[Number(weather.SKY)]}
              </div>
              <div>
                강수형태: {categories.dangi.PTY.code[Number(weather.PTY)]}
              </div>
              <div>습도: {weather.REH}</div>
              <div>풍속: {weather.WSD}</div>
              <div>풍향: {getWindDeg(Number(weather.VEC))}</div>
            </div>
          </React.Fragment>
        ))}
    </>
  );
};

export default FutureWeather;
