import Image from "next/image";

interface Props {
  inputId: string;
  message: string;
}

const Notice = ({ inputId, message }: Props) => {
  return (
    <>
      <div className="relative flex">
        <input id={inputId} type="checkbox" className="hidden peer" />
        <label
          htmlFor={inputId}
          className="cursor-pointer flex items-center justify-center"
        >
          <Image
            src="/svgs/notice.svg"
            alt="notice-icon"
            width={20}
            height={20}
          />
        </label>
        <div className="font-bold justify-center items-center hidden peer-checked:flex absolute top-0 right-0 -translate-y-[50px] translate-x-[40px] w-20 h-10 bg-[#0058e9] text-white rounded-lg after:content-[''] after:absolute after:border-[8px] after:border-t-[#0058e9] after:border-r-transparent after:border-b-transparent after:border-l-transparent after:right-1/2 after:top-full">
          {message}
        </div>
      </div>
    </>
  );
};

export default Notice;
