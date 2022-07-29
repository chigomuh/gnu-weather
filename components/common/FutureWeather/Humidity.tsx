interface Props {
  reh: string;
}

const Humidity = ({ reh }: Props) => {
  return (
    <>
      <div>습도: {reh}</div>
    </>
  );
};

export default Humidity;
