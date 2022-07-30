import useFutureWeather from "hooks/useFutureWeather";
import React, { useRef, useState } from "react";
import Weather from "components/common/FutureWeather/Weather";
import Precipitation from "components/common/FutureWeather/Precipitation";
import Windy from "components/common/FutureWeather/Windy";
import Humidity from "components/common/FutureWeather/Humidity";
import FcstTime from "components/common/FutureWeather/FcstTime";
import ButtonTap from "components/common/ButtonTap";
import Arrow from "components/common/Arrow";

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

  const onClickTap = (type: string) => {
    setCurrenOpenTap(type);
    setSliderX(0);
  };

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="flex space-x-10 w-full justify-center h-10 items-center text-xl">
          <ButtonTap
            tapId="weather"
            title="날씨"
            currentOpen={currenOpenTap}
            onClick={onClickTap}
          />
          <ButtonTap
            tapId="precipitation"
            title="강수"
            currentOpen={currenOpenTap}
            onClick={onClickTap}
          />
          <ButtonTap
            tapId="windy"
            title="바람"
            currentOpen={currenOpenTap}
            onClick={onClickTap}
          />
          <ButtonTap
            tapId="humidity"
            title="습도"
            currentOpen={currenOpenTap}
            onClick={onClickTap}
          />
        </div>
        <div className="relative flex justify-center">
          <Arrow direction="left" onClick={onClickSlider} />
          <Arrow direction="right" onClick={onClickSlider} />
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
                    <div className="space-y-2">
                      {currenOpenTap === "weather" && (
                        <Weather
                          tmp={weather.TMP}
                          sky={weather.SKY}
                          pty={weather.PTY}
                          time={weather.fcstTime}
                        />
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
                      <FcstTime
                        date={weather.fcstDate}
                        time={weather.fcstTime}
                      />
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
