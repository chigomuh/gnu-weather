import Notice from "components/common/Notice";

interface Props {
  mainText: string[];
  noticeText?: string;
}

const BlockInfo = ({ mainText, noticeText }: Props) => {
  return (
    <>
      <div className="flex flex-col items-center border rounded-md p-2 bg-[#3bc2cd]/30">
        <div>{mainText[0]}</div>
        <div className="text-[#00239C] font-bold text-lg flex">
          {mainText[1]}
          {noticeText && (
            <Notice
              inputId={`${mainText[0]}${noticeText}`}
              message={noticeText}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BlockInfo;
