import { categories } from "components/configs/weather";
import getWindDeg from "components/functions/getWindDeg";
import useWeather from "hooks/useWeather";
import Image from "next/image";

interface Props {
  x: number;
  y: number;
}

const Weather = ({ x, y }: Props) => {
  const { data } = useWeather(x, y);

  const {
    categories: category,
    categories: { DIF },
  } = data;
  const isPlus = parseFloat(DIF) >= 0;
  const dif = isPlus ? parseFloat(DIF) : -parseFloat(DIF);

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2 flex flex-col items-center">
          <div className="text-6xl font-bold">{category.T1H}°</div>
          <div className="flex text-2xl space-x-4">
            <div className="flex items-center justify-center">
              <div>{dif === 0 ? `어제와 동일해요 / ` : `어제보다 ${dif}°`}</div>
              <div
                className={`${isPlus ? "" : "rotate-180"}${
                  dif === 0 ? "hidden" : ""
                } flex items-center justify-center`}
              >
                <Image
                  src="/svgs/topArrow.svg"
                  alt="arrow-icon"
                  width={30}
                  height={30}
                />
              </div>
            </div>
            {category.PTY !== "0" ? (
              <div>{categories.chodangisil.PTY.code[+category.PTY]}</div>
            ) : (
              <div>{categories.chodangiyebo.SKY.code[+category.SKY]}</div>
            )}
          </div>
          <div className="flex space-x-4">
            <div>습도: {category.REH}%</div>
            <div>풍속: {category.WSD}m/s</div>
            <div>풍향: {getWindDeg(Number(category.VEC))}풍</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
