import Image from "next/image";
import Link from "next/link";

const Loading = () => {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden flex justify-center">
        <div className="relative w-full h-full max-w-4xl bg-[#FCEDDA] flex-col">
          <h1 className="text-4x text-4xl font-bold p-8 text-[#7b9acc]">
            궁금한 날씨
          </h1>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="flex justify-center items-center w-full h-full">
              <Image
                src="/images/mascot/gnu-basic.png"
                alt="mascot-gnu"
                width={300}
                height={400}
                className="z-50"
              />
            </div>
          </div>
          <div className="w-full h-60 bg-[#00539C] absolute bottom-0 rounded-3xl translate-y-8 flex justify-center items-center z-0">
            <Link href="/">
              <a className="w-full h-10 flex items-center justify-center mx-4 rounded-full bg-[#FCEDDA] text-[#00539C] font-bold animate-shake">
                날씨 확인하기
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
