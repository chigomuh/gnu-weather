import Seo from "components/layout/Seo";
import useCurrentPosition from "hooks/useCurrentPosition";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import dfsXyConv from "components/functions/dfsXyConv";
import TodayWeather from "components/common/MainWeather/TodayWeather";
import FutureWeather from "components/common/FutureWeather/FutureWeather";
import Image from "next/image";

const URL_ORIGIN = process.env.NEXT_PUBLIC_URL_ORIGIN;

const Home: NextPage = () => {
  const [address, setAddress] = useState("");
  const { latitude, longitude } = {
    latitude: 35.1530444,
    longitude: 128.1010899,
  };
  const [currentLat, setCurrentLat] = useState(latitude);
  const [currentLng, setCurrentLng] = useState(longitude);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const inputAddressRef = useRef<HTMLInputElement>(null);

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
    const { current } = checkboxRef;
    if (current) {
      current.checked = false;
    }
  };

  const onClickCheckBox = () => {
    if (checkboxRef.current && inputAddressRef.current) {
      const {
        current: { checked },
      } = checkboxRef;

      if (!checked) {
        const { current: addressCurrent } = inputAddressRef;
        addressCurrent.focus();
      }
    }
  };

  const currentPosition = () => {
    const successCb = (position: GeolocationPosition) => {
      const {
        coords: { latitude, longitude },
      } = position;

      setCurrentLat(latitude);
      setCurrentLng(longitude);
    };

    const errorCb = (error: GeolocationPositionError) => {
      console.error(error);
    };

    const { geolocation } = navigator;

    if (!geolocation) {
      return;
    } else {
      geolocation.getCurrentPosition(successCb, errorCb);
    }
  };

  const onClickCurrentLocation = () => {
    currentPosition();
  };

  return (
    <>
      <Seo title="Home" />
      <div className="flex items-center justify-end w-full">
        <form
          onSubmit={onSubmitAddress}
          className="flex items-center justify-end w-full"
        >
          <input
            id="checkbox"
            type="checkbox"
            className="hidden peer"
            ref={checkboxRef}
          />
          <label
            htmlFor="checkbox"
            className="peer-checked:border peer-checked:border-r-0 w-10 h-10 flex justify-center items-center cursor-pointer"
            onClick={onClickCheckBox}
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
            ref={inputAddressRef}
          />
          <button type="submit"></button>
        </form>
        <div
          className="w-10 h-10 flex justify-center items-center"
          onClick={onClickCurrentLocation}
        >
          <Image
            src="/svgs/locationMarker.svg"
            alt="current-location-icon"
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className="space-y-10">
        <TodayWeather position={todayPosition} />
        <FutureWeather position={position} />
      </div>
    </>
  );
};

export default Home;
