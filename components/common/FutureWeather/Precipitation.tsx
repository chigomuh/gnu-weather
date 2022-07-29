import { categories } from "components/configs/weather";

interface Props {
  pty: string;
  pop: string;
  pcp: string;
}

const Precipitation = ({ pty, pop, pcp }: Props) => {
  return (
    <>
      <div>
        강수형태: {categories.dangi.PTY.code[+pty]}
        강수확률: {pop} % 강수량: {pcp}
      </div>
    </>
  );
};

export default Precipitation;
