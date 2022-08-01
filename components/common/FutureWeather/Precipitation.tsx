interface Props {
  pop: string;
  pcp: string;
}

const Precipitation = ({ pop, pcp }: Props) => {
  const random = +Math.random().toString().slice(2, 5) * 2;
  return (
    <>
      <div className="space-y-2">
        <div>{pop}%</div>
        <div className="flex items-center justify-center">
          <div
            className="relative w-8 h-8 rotate-45 overflow-hidden-custom z-50"
            style={{
              borderRadius: "0% 100% 45% 55% / 0% 55% 45% 100%",
              border: "2px solid #676bd0",
            }}
          >
            <div
              className={`${
                +pop === 0
                  ? "hidden"
                  : +pop === 100
                  ? "left-[-15%] top-[-15%]"
                  : ""
              } bg-[#676bd0] w-[150%] h-[150%] relative rounded-2xl animate-waterSpin z-0`}
              style={{
                left: `${75 - +pop}%`,
                top: `${75 - +pop}%`,
                animationDelay: `${random}ms`,
              }}
            ></div>
          </div>
        </div>
        <div>{pcp === "강수없음" ? `-` : pcp}</div>
      </div>
    </>
  );
};

export default Precipitation;
