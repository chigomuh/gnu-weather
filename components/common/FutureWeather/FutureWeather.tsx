import useFutureWeather from "hooks/useFutureWeather";
import { useRef, useState } from "react";
import Weather from "components/common/FutureWeather/Weather";
import Precipitation from "components/common/FutureWeather/Precipitation";
import Windy from "components/common/FutureWeather/Windy";
import Humidity from "components/common/FutureWeather/Humidity";
import FcstTime from "components/common/FutureWeather/FcstTime";
import ButtonTap from "components/common/ButtonTap";
import Arrow from "components/common/Arrow";

const userControlTap = [
  {
    id: "weather",
    title: "날씨",
  },
  {
    id: "precipitation",
    title: "강수",
  },
  {
    id: "windy",
    title: "바람",
  },
  {
    id: "humidity",
    title: "습도",
  },
];

interface Props {
  position: {
    x: number;
    y: number;
  };
}

const FutureWeather = ({ position }: Props) => {
  const [currenOpenTap, setCurrenOpenTap] = useState("weather");
  const { x, y } = position;
  const { data } = useFutureWeather(x, y);
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

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="overflow-x-hidden w-full max-w-4xl">
          <div className="flex space-x-10 w-full justify-center h-10 items-center text-xl">
            {userControlTap.map((tap) => (
              <ButtonTap
                key={tap.id}
                tapId={tap.id}
                title={tap.title}
                currentOpen={currenOpenTap}
                onClick={onClickTap}
              />
            ))}
          </div>
          <div className="relative flex justify-center">
            <Arrow direction="left" onClick={onClickSlider} />
            <Arrow direction="right" onClick={onClickSlider} />
            <div className="w-4/5 h-full overflow-x-hidden text-center">
              <div
                className="flex space-x-4 whitespace-nowrap transition-transform duration-300"
                style={{
                  transform: `translateX(-${sliderX}px)`,
                }}
                ref={SliderRef}
              >
                {data &&
                  data.map((weather) => (
                    <div
                      key={`${weather.fcstDate}${weather.fcstTime}`}
                      className="space-y-2 flex flex-col items-center"
                    >
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
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FutureWeather;
