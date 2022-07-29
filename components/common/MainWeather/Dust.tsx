import { dustGrade } from "components/configs/dust";

interface Props {
  pm10: number;
  pm25: number;
}

const Dust = ({ pm10, pm25 }: Props) => {
  return (
    <>
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center border rounded-md p-2 bg-[#3bc2cd]/30">
          <div>미세먼지</div>
          <div className="text-[#00239C] font-bold">{dustGrade[pm10]}</div>
        </div>
        <div className="flex flex-col items-center border rounded-md p-2 bg-[#3bc2cd]/30">
          <div>초미세먼지</div>
          <div className="text-[#00239C] font-bold">{dustGrade[pm25]}</div>
        </div>
      </div>
    </>
  );
};

export default Dust;
