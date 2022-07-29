interface Props {
  addressName: string;
}

const AddressName = ({ addressName }: Props) => {
  return (
    <>
      <div className="text-center">{addressName}</div>
    </>
  );
};

export default AddressName;
