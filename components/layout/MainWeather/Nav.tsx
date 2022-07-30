import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";

interface Props {
  setCurrentLat: Dispatch<SetStateAction<number>>;
  setCurrentLng: Dispatch<SetStateAction<number>>;
}

const Nav = ({ setCurrentLat, setCurrentLng }: Props) => {
  const URL_ORIGIN = process.env.NEXT_PUBLIC_URL_ORIGIN;
  const [address, setAddress] = useState("");
  const checkboxRef = useRef<HTMLInputElement>(null);
  const inputAddressRef = useRef<HTMLInputElement>(null);

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
      <div className="flex items-center justify-between w-full p-2">
        <div className="flex items-center justify-center">
          <Image
            src="/images/my-logo.png"
            alt="logo"
            width={30}
            height={30}
            className="rounded-md"
          />
        </div>
        <div className="flex items-center justify-center">
          <form
            onSubmit={onSubmitAddress}
            className="flex items-center justify-end"
          >
            <input
              id="checkbox"
              type="checkbox"
              className="hidden peer"
              ref={checkboxRef}
            />
            <label
              htmlFor="checkbox"
              className="peer-checked:border peer-checked:border-black peer-checked:border-r-0 w-10 h-10 flex justify-center items-center cursor-pointer rounded-l-md"
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
              placeholder="검색 해보세요"
              className="w-0 peer-checked:w-full peer-checked:border peer-checked:border-black max-w-[200px] h-10 transition-all duration-500 peer-checked:px-4 rounded-r-md"
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
      </div>
    </>
  );
};

export default Nav;
