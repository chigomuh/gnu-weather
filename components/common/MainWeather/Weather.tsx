import { categories } from "components/configs/weather";
import { CategoriesSil } from "components/functions/getChodangisil";
import getWindDeg from "components/functions/getWindDeg";

interface Props {
  category: CategoriesSil;
}

const Weather = ({ category }: Props) => {
  return (
    <div>
      <div>현재기온: {category.T1H}℃</div>
      <div>
        <div>기온차이: {`어제보다 ${category.DIF}℃`}</div>
        <div>
          하늘상태: {categories.chodangiyebo.SKY.code[Number(category.SKY)]}
        </div>
      </div>
      <div>
        강수형태: {categories.chodangisil.PTY.code[Number(category.PTY)]}
      </div>
      <div>습도: {category.REH}%</div>
      <div>풍속: {category.WSD}</div>
      <div>풍향: {getWindDeg(Number(category.VEC))}</div>
    </div>
  );
};

export default Weather;
