interface Props {
  addressName: string;
}

const AddressName = ({ addressName }: Props) => {
  return <div>{addressName}</div>;
};

export default AddressName;
