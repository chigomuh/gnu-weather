import { WeatherData } from "components/functions/getDangi";
import Weather from "components/common/FutureWeather/Weather";
import Precipitation from "components/common/FutureWeather/Precipitation";
import Windy from "components/common/FutureWeather/Windy";
import Humidity from "components/common/FutureWeather/Humidity";
import FcstTime from "components/common/FutureWeather/FcstTime";
import moment from "moment-timezone";

const dayName = ["오늘", "내일", "모레", "글피", "그글피"];

interface Props {
  weather: WeatherData;
  currenOpenTap: string;
}

const WeatherCard = ({ weather, currenOpenTap }: Props) => {
  const date = weather.fcstDate;
  const time = weather.fcstTime;
  let timeText = `${time.slice(0, 2)}시`;
  let isZero = false;

  if (+time === 0) {
    const today = moment().tz("Asia/Seoul");
    const todayDate = moment(today.format("YYYY-MM-DD")).tz("Asia/Seoul");
    const fcstDate = moment(date).tz("Asia/Seoul");
    const dayDif = fcstDate.diff(todayDate, "days");
    timeText = `${dayName[dayDif]}`;
    isZero = true;
  }

  return (
    <>
      <div
        className={`${
          isZero ? "bg-[#2f437e] text-[#d9edfe]" : "bg-[#d9edfe] text-[#2f437e]"
        } space-y-2 flex flex-col justify-center items-center border rounded-full p-2 font-bold min-h-[80%]`}
        style={{
          boxShadow: isZero
            ? "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
            : "",
        }}
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
        {currenOpenTap === "humidity" && <Humidity reh={weather.REH} />}
        <FcstTime timeText={timeText} />
      </div>
    </>
  );
};

export default WeatherCard;
