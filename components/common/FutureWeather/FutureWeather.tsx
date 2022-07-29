import useFutureWeather from "hooks/useFutureWeather";
import React, { useEffect, useRef, useState } from "react";
import Weather from "components/common/FutureWeather/Weather";
import Precipitation from "./Precipitation";
import Windy from "./Windy";
import Humidity from "./Humidity";
import Image from "next/image";

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
  const [sliderX, setSliderX] = useState(0);
  const SliderRef = useRef<HTMLDivElement>(null);

  const onClickSlider = (type: "left" | "right") => {
    if (SliderRef.current) {
      const {
        current: { clientWidth, scrollWidth },
      } = SliderRef;
      const moveX = clientWidth / 2;

      if (type === "left") {
        if (sliderX - moveX > 0) {
          setSliderX((prev) => prev - moveX);
        } else {
          setSliderX(0);
        }
      } else if (type === "right") {
        if (sliderX + moveX < scrollWidth - clientWidth) {
          setSliderX((prev) => prev + moveX);
        } else {
          setSliderX(scrollWidth - clientWidth);
        }
      } else {
        return;
      }
    }
  };

  const onClickTap = (
    type: "weather" | "precipitation" | "windy" | "humidity"
  ) => {
    setCurrenOpenTap(type);
    setSliderX(0);
  };

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="flex space-x-10 w-full justify-center h-10 items-center text-xl">
          <button
            style={{
              opacity: currenOpenTap === "weather" ? 1 : 0.5,
            }}
            onClick={() => onClickTap("weather")}
          >
            날씨
          </button>
          <button
            style={{
              opacity: currenOpenTap === "precipitation" ? 1 : 0.5,
            }}
            onClick={() => onClickTap("precipitation")}
          >
            강수
          </button>
          <button
            style={{
              opacity: currenOpenTap === "windy" ? 1 : 0.5,
            }}
            onClick={() => onClickTap("windy")}
          >
            바람
          </button>
          <button
            style={{
              opacity: currenOpenTap === "humidity" ? 1 : 0.5,
            }}
            onClick={() => onClickTap("humidity")}
          >
            습도
          </button>
        </div>
        <div className="relative flex justify-center">
          <button
            className="absolute top-1/2 left-0 -translate-y-[50%] w-10 h-full flex justify-center items-center"
            onClick={() => onClickSlider("left")}
          >
            <Image
              src="/svgs/leftArrow.svg"
              alt="left-arrow"
              width="30"
              height="30"
            />
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-[50%] w-10 h-full rotate-180 flex justify-center items-center"
            onClick={() => onClickSlider("right")}
          >
            <Image
              src="/svgs/leftArrow.svg"
              alt="left-arrow"
              width="30"
              height="30"
            />
          </button>
          <div className="w-4/5 overflow-x-hidden text-center">
            <div
              className="flex space-x-4 whitespace-nowrap transition-transform duration-300"
              style={{
                transform: `translateX(-${sliderX}px)`,
              }}
              ref={SliderRef}
            >
              {data &&
                data.map((weather) => (
                  <React.Fragment
                    key={`${weather.fcstDate}${weather.fcstTime}`}
                  >
                    <div>
                      <div>{weather.fcstDate.slice(4)}</div>
                      {currenOpenTap === "weather" && (
                        <Weather tmp={weather.TMP} sky={weather.SKY} />
                      )}
                      {currenOpenTap === "precipitation" && (
                        <Precipitation pop={weather.POP} pcp={weather.PCP} />
                      )}
                      {currenOpenTap === "windy" && (
                        <Windy wsd={weather.WSD} vec={weather.VEC} />
                      )}
                      {currenOpenTap === "humidity" && (
                        <Humidity reh={weather.REH} />
                      )}
                      <div>{weather.fcstTime.slice(0, 2)}시</div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FutureWeather;
