import { Categories, Item } from "hooks/useWeather";

interface WeatherData {
  fcstDates: SGTimes;
  baseDate: string;
  baseTime: string;
}

interface SGCategories {
  [key: string]: Categories;
}

interface SGTimes {
  [key: string]: {
    categories: Categories;
    fcstTime: string;
    fcstDate: string;
    nx: number;
    ny: number;
  };
}

const getChodangiyebo = (items: Item[], nowTime: string) => {
  let weatherData: WeatherData = {
    fcstDates: {},
    baseDate: "",
    baseTime: "",
  };
  const categories: SGCategories = {};
  const times: SGTimes = {};

  items.forEach((item: Item) => {
    categories[item.fcstTime] = {
      ...categories[item.fcstTime],
      [item.category]: item.fcstValue,
    };

    times[item.fcstTime] = {
      categories: categories[item.fcstTime],
      fcstTime: item.fcstTime,
      fcstDate: item.fcstDate,
      nx: item.nx,
      ny: item.ny,
    };

    weatherData = {
      fcstDates: {
        ...times,
      },
      baseDate: item.baseDate,
      baseTime: item.baseTime,
    };
  });

  if (weatherData.fcstDates) {
    const data = weatherData.fcstDates[nowTime];

    return {
      data,
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
