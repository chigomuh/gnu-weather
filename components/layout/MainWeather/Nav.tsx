import Image from "next/image";
import Link from "next/link";
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
  const errorAddressRef = useRef<HTMLDivElement>(null);

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

      const { current } = checkboxRef;
      if (current) {
        current.checked = false;
      }

      if (errorAddressRef.current) {
        const {
          current: { classList },
        } = errorAddressRef;

        classList.remove("peer-checked:flex");
      }
    } else {
      if (errorAddressRef.current) {
        const {
          current: { classList },
        } = errorAddressRef;

        classList.add("peer-checked:flex");

        setTimeout(() => {
          classList.remove("peer-checked:flex");
        }, 3000);
      }
    }

    setAddress("");
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
      <nav className="fixed w-full justify-center items-center z-50 text-white h-14">
        <div className="flex items-center justify-between w-full max-w-4xl p-2">
          <input type="checkbox" id="logoInput" className="hidden peer" />
          <label
            htmlFor="logoInput"
            className="flex items-center justify-center cursor-pointer peer-checked:animate-spin"
          >
            <Image
              src="/images/my-logo.png"
              alt="logo"
              width={30}
              height={30}
              className="rounded-md"
            />
          </label>
          <div className="flex items-center justify-center">
            <form
              onSubmit={onSubmitAddress}
              className="flex items-center justify-end relative"
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
                className="w-0 peer-checked:w-full peer-checked:border peer-checked:border-black max-w-[200px] h-10 transition-all duration-500 peer-checked:px-4 rounded-r-md outline-none bg-transparent"
                ref={inputAddressRef}
              />
              <div
                className="font-bold justify-center items-center hidden absolute bottom-0 right-0 -translate-x-10 translate-y-14 w-36 h-10 bg-[#f51800] text-white rounded-lg after:content-[''] after:absolute after:border-[8px] after:border-t-transparent after:border-r-transparent after:border-b-[#f51800] after:border-l-transparent after:right-1/2 after:bottom-full z-10 text-center"
                ref={errorAddressRef}
              >
                주소가 이상해요
              </div>
              <button type="submit"></button>
            </form>
            <div
              className="w-10 h-10 flex justify-center items-center cursor-pointer"
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
      </nav>
    </>
  );
};

export default Nav;
