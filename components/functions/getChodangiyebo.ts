import { Categories, Item } from "hooks/useWeather";

const getChodangiyebo = (items: Item[], nowTime: string) => {
  let weatherData: {
    fcstDates: {
      [key: string]: {};
    } | null;
  } = {
    fcstDates: null,
  };
  const categories: Categories = {};
  const times: {
    [key: string]: {};
  } = {};

  items.forEach((item: Item) => {
    categories[item.category] = item.fcstValue;

    times[item.fcstTime] = {
      ...categories,
      fcstTime: item.fcstTime,
      fcstDate: item.fcstDate,
      nx: item.nx,
      ny: item.ny,
    };

    weatherData = {
      fcstDates: {
        ...times,
      },
    };
  });

  if (weatherData.fcstDates) {
    return {
      data: weatherData.fcstDates[nowTime],
      success: true,
    };
  } else {
    return {
      data: undefined,
      success: false,
    };
  }
};

export default getChodangiyebo;
