import { dustGrade } from "components/configs/dust";
import BlockInfo from "components/common/BlockInfo";

interface Props {
  pm10: number;
  pm25: number;
  pm10Value: number;
  pm25Value: number;
}

const Dust = ({ pm10, pm25, pm10Value, pm25Value }: Props) => {
  return (
    <>
      <div className="flex justify-center space-x-4">
        <BlockInfo
          mainText={["미세먼지", dustGrade[pm10] ?? "-"]}
          noticeText={pm10Value ? `${pm10Value}㎍/㎥` : `관측 안됨`}
        />
        <BlockInfo
          mainText={["초미세먼지", dustGrade[pm25] ?? "-"]}
          noticeText={pm25Value ? `${pm25Value}㎍/㎥` : `관측 안됨`}
        />
      </div>
    </>
  );
};

export default Dust;
