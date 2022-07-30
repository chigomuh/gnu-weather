import { categories } from "components/configs/weather";
import Image from "next/image";

interface Props {
  tmp: string;
  sky: string;
  pty: string;
  time: string;
}

const Weather = ({ tmp, sky, pty, time }: Props) => {
  const nowTime = +time.slice(0, 2);
  const isDay = nowTime >= 20 || nowTime < 6 ? false : true;

  return (
    <>
      <div className="space-y-2">
        <div>{tmp}℃</div>
        <div>
          <Image
            src={`${
              +pty !== 0
                ? categories.dangi.PTY.iconPath[+pty]
                : isDay
                ? categories.dangi.SKY.day.iconPath[+sky]
                : categories.dangi.SKY.night.iconPath[+sky]
            }`}
            alt="weather-icon"
            width={30}
            height={30}
          />
        </div>
      </div>
    </>
  );
};

export default Weather;
