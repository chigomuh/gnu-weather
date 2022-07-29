import { dustGrade } from "components/configs/dust";

interface Props {
  pm10: number;
  pm25: number;
}

const Dust = ({ pm10, pm25 }: Props) => {
  return (
    <>
      <div>미세먼지: {dustGrade[pm10]}</div>
      <div>초미세먼지: {dustGrade[pm25]}</div>
    </>
  );
};

export default Dust;
