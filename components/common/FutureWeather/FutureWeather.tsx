import useFutureWeather from "hooks/useFutureWeather";
import { useRef, useState } from "react";
import ButtonTap from "components/common/ButtonTap";
import Arrow from "components/common/Arrow";
import WeatherCard from "./WeatherCard";

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
      <div className="overflow-x-hidden w-full max-w-4xl absolute bottom-0 z-50 rounded-t-3xl bg-slate-100 h-48">
        <div className="flex space-x-10 w-full justify-center h-1/5 items-center text-xl text-black">
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
        <div className="relative flex justify-center h-4/5 w-full">
          <Arrow direction="left" onClick={onClickSlider} />
          <Arrow direction="right" onClick={onClickSlider} />
          <div className="w-4/5 h-full overflow-x-hidden text-center">
            <div
              className="flex space-x-4 whitespace-nowrap transition-transform duration-300 h-full w-full items-center pl-2"
              style={{
                transform: `translateX(-${sliderX}px)`,
              }}
              ref={SliderRef}
            >
              {data &&
                data.map((weather) => (
                  <WeatherCard
                    key={`${weather.fcstDate}${weather.fcstTime}`}
                    weather={weather}
                    currenOpenTap={currenOpenTap}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FutureWeather;
