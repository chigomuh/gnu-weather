import { categories } from "components/configs/weather";

interface Props {
  tmp: string;
  sky: string;
}

const Weather = ({ tmp, sky }: Props) => {
  return (
    <>
      <div>
        <div>{tmp}℃</div>
        <div>{categories.dangi.SKY.code[+sky]}</div>
      </div>
    </>
  );
};

export default Weather;
