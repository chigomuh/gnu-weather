const passDayChangeTime = (time: string): string => {
  return time === "2400" ? "0000" : time.length === 4 ? time : "0" + time;
};

const getNowTime = (baseTime: string): string => {
  const num =
    baseTime[3] === "0"
      ? (Number(baseTime) + 100).toString()
      : (Number(baseTime) + 70).toString();

  return passDayChangeTime(num);
};

export default getNowTime;
