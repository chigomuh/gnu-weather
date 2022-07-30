interface Props {
  tapId: string;
  title: string;
  currentOpen: string;
  onClick: (arg0: string) => void;
}

const ButtonTap = ({ tapId, title, currentOpen, onClick }: Props) => {
  return (
    <>
      <button
        className="cursor-pointer"
        style={{
          opacity: currentOpen === tapId ? 1 : 0.5,
        }}
        onClick={() => onClick(tapId)}
      >
        {title}
      </button>
    </>
  );
};

export default ButtonTap;
