import Seo from "components/layout/Seo";
import useCurrentPosition from "hooks/useCurrentPosition";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { NextPage } from "next";
import FutureWeather from "components/common/FutureWeather";
import TodayWeather from "components/common/TodayWeather";
import dfsXyConv from "components/functions/dfsXyConv";

const URL_ORIGIN = process.env.NEXT_PUBLIC_URL_ORIGIN;

const Home: NextPage = () => {
  const [address, setAddress] = useState("");
  const { position: currentPosition, error } = useCurrentPosition();

  const { latitude, longitude } = currentPosition;
  const [currentLat, setCurrentLat] = useState(35.1530444);
  const [currentLng, setCurrentLng] = useState(128.1010899);

  const todayPosition = { latitude: currentLat, longitude: currentLng };

  const { x, y } = dfsXyConv("toXY", currentLat, currentLng);

  const position = { x, y };

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
      <div>홈</div>
      <form onSubmit={onSubmitAddress}>
        <input type="text" onChange={onChangeAddress} value={address} />
        <button type="submit">검색</button>
      </form>
      {!error && <TodayWeather position={todayPosition} />}
      <FutureWeather position={position} />
    </>
  );
};

export default Home;
