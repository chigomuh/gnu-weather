interface Props {
  reh: string;
}

const Humidity = ({ reh }: Props) => {
  // bg-[#2f437e] text-[#d9edfe]
  return (
    <>
      <div className="w-10 h-10 flex border justify-center items-center rounded-full bg-[#7b9acc] text-[#FCF6F5] font-bold">
        {reh}
      </div>
    </>
  );
};

export default Humidity;
