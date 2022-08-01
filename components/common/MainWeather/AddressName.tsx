import { fetcher } from "hooks/useWeather";
import useSWR from "swr";

const URL_ORIGIN = process.env.NEXT_PUBLIC_URL_ORIGIN;

interface AddressData {
  success: boolean;
  data: {
    meta: {
      total_count: number;
    };
    documents: {
      address_name: string;
      code: string;
      region_type: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      region_4depth_name: string;
      x: number;
      y: number;
    }[];
  };
}

interface Props {
  lat: number;
  lng: number;
}

const AddressName = ({ lat, lng }: Props) => {
  const { data } = useSWR<AddressData>(
    `${URL_ORIGIN}/api/address?lat=${lat}&lng=${lng}`,
    fetcher,
    { suspense: true }
  );

  const addressNameArr = data?.data.documents[0].address_name.split(" ");
  const lastAddressName = addressNameArr?.pop();
  const firstAddressName = addressNameArr?.join(" ");
  console.log(firstAddressName);

  return (
    <>
      {data && (
        <div className="pl-4">
          <span className="text-xl font-bold">{lastAddressName}</span>
          <div>{firstAddressName}</div>
        </div>
      )}
    </>
  );
};

export default AddressName;
