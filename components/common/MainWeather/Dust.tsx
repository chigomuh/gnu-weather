import { dustGrade } from "components/configs/dust";
import BlockInfo from "components/common/BlockInfo";
import useSWR from "swr";
import { fetcher } from "hooks/useWeather";

const URL_ORIGIN = process.env.NEXT_PUBLIC_URL_ORIGIN;

interface DustData {
  success: boolean;
  data: {
    pm10: string;
    pm25: string;
    pm10Value: string;
    pm25Value: string;
    station: string;
  };
}

interface Props {
  lat: number;
  lng: number;
}

const Dust = ({ lat, lng }: Props) => {
  const { data } = useSWR<DustData>(
    `${URL_ORIGIN}/api/dust?lat=${lat}&lng=${lng}`,
    fetcher,
    { suspense: true }
  );

  return (
    <>
      {data && (
        <div className="flex justify-center space-x-4 pr-4">
          <BlockInfo
            mainText={["미세먼지", dustGrade[+data.data.pm10] ?? "-"]}
            noticeText={
              +data.data.pm10Value
                ? `${+data.data.pm10Value}㎍/㎥`
                : `관측 안됨`
            }
          />
          <BlockInfo
            mainText={["초미세먼지", dustGrade[+data.data.pm25] ?? "-"]}
            noticeText={
              +data.data.pm25Value
                ? `${+data.data.pm25Value}㎍/㎥`
                : `관측 안됨`
            }
          />
        </div>
      )}
    </>
  );
};

export default Dust;
