import Notice from "components/common/Notice";

interface Props {
  mainText: string[];
  noticeText?: string;
}

const BlockInfo = ({ mainText, noticeText }: Props) => {
  return (
    <>
      <div
        className="flex flex-col items-center rounded-md p-2 whitespace-nowrap"
        style={{
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        }}
      >
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
