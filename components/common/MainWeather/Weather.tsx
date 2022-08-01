import { categories } from "components/configs/weather";
import getWindDeg from "components/functions/getWindDeg";
import useWeather from "hooks/useWeather";
import Image from "next/image";

const backgroundColorsSky = ["", "#037dec", "", "#0197a7", "#0197a7"];

const backgroundColorPty = [
  "",
  "#6f7883",
  "#0197a7",
  "#0197a7",
  "",
  "#6f7883",
  "#0197a7",
  "#0197a7",
];

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
  const skyText = categories.chodangiyebo.SKY.code[+category.SKY];
  const ptyText = categories.chodangisil.PTY.code[+category.PTY];
  const skyBg = backgroundColorsSky[+category.SKY];
  const ptyBg = backgroundColorPty[+category.PTY];

  return (
    <>
      <div
        className="w-screen h-screen absolute top-0 left-0 z-[-1]"
        style={{
          backgroundColor: category.PTY !== "0" ? ptyBg : skyBg,
        }}
      ></div>
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
            {category.PTY !== "0" ? <div>{ptyText}</div> : <div>{skyText}</div>}
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
