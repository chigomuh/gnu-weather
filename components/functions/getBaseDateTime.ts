import plusZero from "./plusZero";

const getBaseDateTime = (type: "chodangiyebo" | "chodangisil" | "dangi") => {
  const today = new Date(Date.now());
  let baseDate = `${today.getFullYear()}${plusZero(
    today.getMonth() + 1
  )}${plusZero(today.getDate())}`;
  let baseTime =
    today.getMinutes() < 30
      ? plusZero(today.getHours() - 1)
      : plusZero(today.getHours());

  if (today.getHours() === 0 && today.getMinutes() < 30) {
    baseDate = `${today.getFullYear()}${plusZero(
      today.getMonth() + 1
    )}${plusZero(today.getDate() - 1)}`;
  }

  if (type === "chodangiyebo") {
    baseTime = baseTime + "30";
  } else if (type === "chodangisil") {
    baseTime = baseTime + "00";
  } else if (type === "dangi") {
    const dangiBaseTimes = [2, 5, 8, 11, 14, 17, 20, 23];
    for (let i = 0; i < dangiBaseTimes.length; i++) {
      const nowHours = today.getHours() === 0 ? 24 : today.getHours();
      const difTime = nowHours - dangiBaseTimes[i];
      if (difTime < 3 && difTime >= 0) {
        baseTime = dangiBaseTimes[i].toString() + "00";
        break;
      }
    }
  }

  return { baseDate, baseTime };
};
export default getBaseDateTime;
