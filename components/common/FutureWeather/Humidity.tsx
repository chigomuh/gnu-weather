interface Props {
  reh: string;
}

const Humidity = ({ reh }: Props) => {
  return (
    <>
      <div>{reh}%</div>
    </>
  );
};

export default Humidity;
