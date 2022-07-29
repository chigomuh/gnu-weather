import Seo from "components/layout/Seo";
import useCurrentPosition from "hooks/useCurrentPosition";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { NextPage } from "next";
import dfsXyConv from "components/functions/dfsXyConv";
import TodayWeather from "components/common/MainWeather/TodayWeather";
import FutureWeather from "components/common/FutureWeather/FutureWeather";
import { fetcher } from "hooks/useWeather";
import useSWR from "swr";
import AddressName from "components/common/MainWeather/AddressName";
import Image from "next/image";

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

const Home: NextPage = () => {
  const [address, setAddress] = useState("");
  const { position: currentPosition, error } = useCurrentPosition();

  const { latitude, longitude } = currentPosition;
  const [currentLat, setCurrentLat] = useState(35.1530444);
  const [currentLng, setCurrentLng] = useState(128.1010899);

  const todayPosition = { latitude: currentLat, longitude: currentLng };

  const { x, y } = dfsXyConv("toXY", currentLat, currentLng);

  const position = { x, y };

  const lat = latitude ?? 35.1530444;
  const lng = longitude ?? 128.1010899;

  const { data: addressData, error: addressError } = useSWR<AddressData>(
    `${URL_ORIGIN}/api/address?lat=${lat}&lng=${lng}`,
    fetcher
  );

  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setAddress(value);
  };

  const onSubmitAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (address === "") {
      return;
    }
    const json = await (
      await fetch(`${URL_ORIGIN}/api/coords?address=${address}`)
    ).json();

    if (json.data) {
      const { lat: searchLat, lng: searchLng } = json.data;

      setCurrentLat(Number(searchLat));
      setCurrentLng(Number(searchLng));
    } else {
      alert("주소를 다시 확인해주세요.");
    }

    setAddress("");
  };

  useEffect(() => {
    const lat = latitude ?? 35.1530444;
    const lng = longitude ?? 128.1010899;
    setCurrentLat(lat);
    setCurrentLng(lng);
  }, [latitude, longitude]);

  return (
    <>
      <Seo title="Home" />
      <form
        onSubmit={onSubmitAddress}
        className="flex items-center justify-end"
      >
        <input id="checkbox" type="checkbox" className="hidden peer" />
        <label
          htmlFor="checkbox"
          className="peer-checked:border peer-checked:border-r-0 w-10 h-10 flex justify-center items-center cursor-pointer"
        >
          <Image
            src="/svgs/search.svg"
            alt="search-icon"
            width={30}
            height={30}
          />
        </label>
        <label htmlFor="addressInput"></label>
        <input
          id="addressInput"
          type="text"
          onChange={onChangeAddress}
          value={address}
          className="w-0 peer-checked:w-1/2 peer-checked:border max-w-[200px] h-10 transition-all duration-300"
        />
        <button type="submit"></button>
      </form>
      {addressData && (
        <AddressName addressName={addressData.data.documents[0].address_name} />
      )}
      <div className="space-y-10">
        {!error && <TodayWeather position={todayPosition} />}
        <FutureWeather position={position} />
      </div>
    </>
  );
};

export default Home;
