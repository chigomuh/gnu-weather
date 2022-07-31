import getWindDeg from "components/functions/getWindDeg";
import Image from "next/image";

interface Props {
  wsd: string;
  vec: string;
}

const Windy = ({ wsd, vec }: Props) => {
  return (
    <>
      <div>{getWindDeg(+vec)}풍</div>
      <div
        className="flex items-center justify-center"
        style={{
          transform: `rotate(${45 + +vec}deg)`,
        }}
      >
        <Image
          src="/svgs/direction.svg"
          alt="direction-icon"
          width={25}
          height={25}
        />
      </div>
      <div>{wsd}m/s</div>
    </>
  );
};

export default Windy;
