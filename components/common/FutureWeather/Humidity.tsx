interface Props {
  reh: string;
}

const Humidity = ({ reh }: Props) => {
  return (
    <>
      <div className="w-10 h-10 flex border justify-center items-center rounded-full bg-[#F0EDCC] text-[#02343F] font-bold">
        {reh}
      </div>
    </>
  );
};

export default Humidity;
