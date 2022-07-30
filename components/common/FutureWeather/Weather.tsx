import { categories } from "components/configs/weather";
import Image from "next/image";

interface Props {
  tmp: string;
  sky: string;
  pty: string;
  time: string;
}

/**
 * sky 코드로 상태 확인 -> 낮인지 밤인지 확인 -> 경로 바꿈
 * 만약에 pty !== "없음" ? pty 보여주기 : sky 보여주기
 */

const Weather = ({ tmp, sky, pty, time }: Props) => {
  const nowTime = +time.slice(0, 2);
  const isDay = nowTime >= 20 || nowTime < 6 ? false : true;
  console.log(isDay, nowTime);
  return (
    <>
      <div>
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
