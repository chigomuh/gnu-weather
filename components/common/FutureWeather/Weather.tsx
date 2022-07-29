import { categories } from "components/configs/weather";

interface Props {
  tmp: string;
  sky: string;
}

const Weather = ({ tmp, sky }: Props) => {
  return (
    <>
      <div>기온: {tmp}℃</div>
      <div>하늘상태: {categories.dangi.SKY.code[+sky]}</div>
    </>
  );
};

export default Weather;
