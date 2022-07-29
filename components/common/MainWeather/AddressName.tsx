interface Props {
  addressName: string;
}

const AddressName = ({ addressName }: Props) => {
  return (
    <>
      <div className="text-center text-xl font-bold">{addressName}</div>
    </>
  );
};

export default AddressName;
