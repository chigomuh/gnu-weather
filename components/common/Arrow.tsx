import Image from "next/image";

interface Props {
  direction: "left" | "right";
  onClick: (direction: "left" | "right") => void;
}

const Arrow = ({ direction, onClick }: Props) => {
  return (
    <>
      <button
        className={`${
          direction === "left" ? "left-0" : "right-0 rotate-180"
        } absolute top-1/2 -translate-y-[50%] w-10 h-full flex justify-center items-center cursor-pointer`}
        onClick={() => onClick(direction)}
      >
        <Image
          src="/svgs/leftArrow.svg"
          alt="left-arrow"
          width="30"
          height="30"
        />
      </button>
    </>
  );
};

export default Arrow;
