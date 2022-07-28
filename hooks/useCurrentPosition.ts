import { useEffect, useState } from "react";

export interface Position {
  latitude: number | null;
  longitude: number | null;
}
const useCurrentPosition = () => {
  const [position, setPosition] = useState<Position>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(false);
  const successCb = (position: GeolocationPosition) => {
    const {
      coords: { latitude, longitude },
    } = position;

    setPosition({ latitude, longitude });
  };

  const errorCb = (error: GeolocationPositionError) => {
    console.error(error);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError(true);
    } else {
      geolocation.getCurrentPosition(successCb, errorCb);
    }
  }, []);

  return { position, error };
};

export default useCurrentPosition;
