import { Item } from "hooks/useWeather";
import getChodangiyebo from "./getChodangiyebo";

interface ItemSil {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
}

interface CategoriesSil {
  [key: string]: string;
  SKY: string;
  DIF: string;
}

const getChodangisil = (
  items: ItemSil[],
  itemsY: ItemSil[],
  itemsSky: Item[],
  nowTime: string
) => {
  const categories: CategoriesSil = {
    SKY: "",
    DIF: "",
  };
  const categoriesY: {
    [key: string]: string;
  } = {};
  const chodangiyebo = getChodangiyebo(itemsSky, nowTime);
  const sky = chodangiyebo.data
    ? chodangiyebo.data.categories.SKY.toString()
    : "";
  items.forEach((item) => {
    categories[item.category] = item.obsrValue;
  });
  itemsY.forEach((item) => {
    categoriesY[item.category] = item.obsrValue;
  });
  categories["SKY"] = sky;
  categories["DIF"] = (
    Math.round(
      (Number(categories["T1H"]) -
        Number(categoriesY["T1H"]) +
        Number.EPSILON) *
        100
    ) / 100
  ).toString();

  const weatherData = {
    baseDate: items[0].baseDate,
    baseTime: items[0].baseTime,
    nx: items[0].nx,
    ny: items[0].ny,
    categories,
  };

  if (weatherData) {
    return {
      data: weatherData,
      success: true,
    };
  } else {
    return {
      data: null,
      success: false,
    };
  }
};

export default getChodangisil;
