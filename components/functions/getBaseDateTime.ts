import moment from "moment-timezone";
import plusZero from "./plusZero";

const getBaseDateTime = (type: "chodangiyebo" | "chodangisil" | "dangi") => {
  const koreaTime = moment().tz("Asia/Seoul");

  const today = moment(koreaTime.valueOf());
  let baseDate = `${today.year()}${plusZero(today.month() + 1)}${plusZero(
    today.date()
  )}`;
  let baseTime =
    today.minutes() < 30
      ? plusZero(today.hours() - 1)
      : plusZero(today.hours());

  if (today.hours() === 0 && today.minutes() < 30) {
    baseDate = `${today.year()}${plusZero(today.month() + 1)}${plusZero(
      today.date() - 1
    )}`;
  }

  if (type === "chodangiyebo") {
    baseTime = baseTime + "30";
  } else if (type === "chodangisil") {
    baseTime = baseTime + "00";
  } else if (type === "dangi") {
    const dangiBaseTimes = [2, 5, 8, 11, 14, 17, 20, 23];
    const nowHours = today.hours() < 2 ? today.hours() + 24 : today.hours();

    for (let i = 0; i < dangiBaseTimes.length; i++) {
      const difTime = nowHours - dangiBaseTimes[i];
      if (difTime < 3 && difTime >= 0) {
        baseTime = plusZero(dangiBaseTimes[i]).toString() + "00";
        break;
      }
    }

    if (baseTime === "2300" && today.hours() <= 1) {
      baseDate = `${today.year()}${plusZero(today.month() + 1)}${plusZero(
        today.date() - 1
      )}`;
    }
  }

  return { baseDate, baseTime };
};
export default getBaseDateTime;
