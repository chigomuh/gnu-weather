import moment from "moment-timezone";

const dayName = ["오늘", "내일", "모레", "글피", "그글피"];

interface Props {
  date: string;
  time: string;
}

const FcstTime = ({ date, time }: Props) => {
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
    <div
      className={`${
        isZero ? "border-2 border-[#1d5aa9] rounded-full w-max h-max px-2" : ""
      }`}
    >
      {timeText}
    </div>
  );
};

export default FcstTime;
