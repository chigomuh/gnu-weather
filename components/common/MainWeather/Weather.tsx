import { categories } from "components/configs/weather";
import { CategoriesSil } from "components/functions/getChodangisil";
import getWindDeg from "components/functions/getWindDeg";
import Image from "next/image";

interface Props {
  category: CategoriesSil;
}

const Weather = ({ category }: Props) => {
  const { DIF } = category;
  const isPlus = parseFloat(DIF) >= 0;
  const dif = isPlus ? parseFloat(DIF) : -parseFloat(DIF);

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-center relative">
          <Image
            src="/images/mascot/gnu-basic.png"
            width={200}
            height={200}
            alt="gnu-mascot"
          />
        </div>
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
