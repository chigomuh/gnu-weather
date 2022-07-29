interface Props {
  pop: string;
  pcp: string;
}

const Precipitation = ({ pop, pcp }: Props) => {
  return (
    <>
      <div>
        <div>{pop}%</div>
        <div>{pcp === "강수없음" ? `0mm` : pcp}</div>
      </div>
    </>
  );
};

export default Precipitation;
