import getWindDeg from "components/functions/getWindDeg";

interface Props {
  wsd: string;
  vec: string;
}

const Windy = ({ wsd, vec }: Props) => {
  return (
    <>
      <div>{wsd}m/s</div>
      <div>{getWindDeg(+vec)}풍</div>
    </>
  );
};

export default Windy;
