import getWindDeg from "components/functions/getWindDeg";

interface Props {
  wsd: string;
  vec: string;
}

const Windy = ({ wsd, vec }: Props) => {
  return (
    <>
      <div>풍속: {wsd}</div>
      <div>풍향: {getWindDeg(+vec)}</div>
    </>
  );
};

export default Windy;
