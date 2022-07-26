const getNowTime = (baseTime: string): string => {
  const passDayChangeTime = (time: string): string => {
    if (time === "2400") {
      return "0000";
    } else {
      if (time.length === 4) return time;
      else return "0" + time;
    }
  };

  if (baseTime[3] === "0") {
    const num = (Number(baseTime) + 100).toString();

    return passDayChangeTime(num);
  } else {
    const num = (Number(baseTime) + 70).toString();

    return passDayChangeTime(num);
  }
};

export default getNowTime;
