import { dustGrade } from "components/configs/dust";
import Image from "next/image";

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
        <div className="flex flex-col items-center border rounded-md p-4 bg-[#3bc2cd]/30 relative">
          <input id="pm10CheckBox" type="checkbox" className="hidden peer" />
          <label
            htmlFor="pm10CheckBox"
            className="absolute top-0 right-0 cursor-pointer"
          >
            <Image
              src="/svgs/notice.svg"
              alt="notice-icon"
              width={20}
              height={20}
            />
          </label>
          <div className="font-bold justify-center items-center hidden peer-checked:flex absolute top-0 right-0 -translate-y-[50px] translate-x-[40px] w-20 h-10 bg-[#0058e9] text-white rounded-lg after:content-[''] after:absolute after:border-[8px] after:border-t-[#0058e9] after:border-r-transparent after:border-b-transparent after:border-l-transparent after:right-1/2 after:top-full">
            {pm10Value}㎍/㎥
          </div>
          <div>미세먼지</div>
          <div className="text-[#00239C] font-bold">{dustGrade[pm10]}</div>
        </div>
        <div className="flex flex-col items-center border rounded-md p-4 bg-[#3bc2cd]/30 relative">
          <input id="pm25CheckBox" type="checkbox" className="hidden peer" />
          <label
            htmlFor="pm25CheckBox"
            className="absolute top-0 right-0 cursor-pointer"
          >
            <Image
              src="/svgs/notice.svg"
              alt="notice-icon"
              width={20}
              height={20}
            />
          </label>
          <div className="font-bold justify-center items-center hidden peer-checked:flex absolute top-0 right-0 -translate-y-[50px] translate-x-[40px] w-20 h-10 bg-[#0058e9] text-white rounded-lg after:content-[''] after:absolute after:border-[8px] after:border-t-[#0058e9] after:border-r-transparent after:border-b-transparent after:border-l-transparent after:right-1/2 after:top-full">
            {pm25Value}㎍/㎥
          </div>
          <div>초미세먼지</div>
          <div className="text-[#00239C] font-bold">{dustGrade[pm25]}</div>
        </div>
      </div>
    </>
  );
};

export default Dust;
