/**
 * component
 * 메인 날씨 출력
 * 필요 정보
 *  - 현재 기온
 *  - 하늘상태 (초단기실황에서는 없음 -> 초단기예보 중 가장 빠른 시간 정보)
 * 있으면 좋은 정보
 *  - 어제 기온 (현재와 어제 기온의 차이)
 *  - 습도
 *  - 바람
 *
 * 초단기실황
 *  참고사항
 *  - 정시 단위이지만 api생성 시간은 30분 단위이므로 30분을 기준 잡아야 함
 *  - 제공 시간 매시 40분
 *  - ex) 현재 시간 20시 29분 -> baseTime: 1900
 *  - ex) 현재 시간 20시 30분 -> baseTime: 2000
 *  - 어제 기온의 경우 1일 이내만 데이터가 송신되므로 현재 시간 + 2분
 *  - ex) 현재 시간 20시 08분 -> baseTime: 2010
 *  가져올 정보
 *  - 현재 기온
 *  - 어제 기온
 *  - 습도
 *
 * 초단기예보
 *  참고사항
 *  - 마찬가지로 api생성 시간은 30분 단위, 제공 시간 매시 45분
 *  가져올 정보
 *  - 하늘상태
 */
/**
 * 위치
 * 현재 위치 허용 -> 현재 위치 값 geoLocation -> 위경도
 * 현재 위치 거부 -> 기본값 -> GNU 위경도
 *
 * 위치 검색 -> 검색한 위치 위경도(api 이용, kakao? 도로명주소? 고민 중)
 */

import { dustGrade } from "components/configs/dust";
import { categories } from "components/configs/weather";
import dfsXyConv from "components/functions/dfsXyConv";
import getWindDeg from "components/functions/getWindDeg";
import { Position } from "hooks/useCurrentPosition";
import useWeather, { fetcher } from "hooks/useWeather";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Props {
  position: Position;
}

const TodayWeather = ({ position }: Props) => {
  const { latitude, longitude } = position;
  const lat = latitude ?? 35.1530444;
  const lng = longitude ?? 128.1010899;
  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLng, setCurrentLng] = useState(lng);

  const { x, y } = dfsXyConv("toXY", currentLat, currentLng);
  const {
    data: weatherData,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useWeather(x, y);
  const { data: addressData, error: addressError } = useSWR(
    `/api/address?lat=${lat}&lng=${lng}`,
    fetcher
  );
  const { data: dustData, error: dustError } = useSWR(
    `/api/dust?lat=${lat}&lng=${lng}`,
    fetcher
  );

  useEffect(() => {
    setCurrentLat(lat);
    setCurrentLng(lng);
  }, [lat, lng]);

  const isLoading = !weatherData || !addressData || !dustData;
  const isError = weatherError || addressError || dustError;

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;
  if (!isLoading && !isError) {
    const category = weatherData.categories;

    return (
      <>
        {addressData && <div>{addressData.data.documents[0].address_name}</div>}
        {weatherData && (
          <div>
            <div>현재기온: {category.T1H}℃</div>
            <div>
              <div>기온차이: {`어제보다 ${category.DIF}℃`}</div>
              <div>
                하늘상태:{" "}
                {categories.chodangiyebo.SKY.code[Number(category.SKY)]}
              </div>
            </div>
            <div>
              강수형태: {categories.chodangisil.PTY.code[Number(category.PTY)]}
            </div>
            <div>습도: {category.REH}%</div>
            <div>풍속: {category.WSD}</div>
            <div>풍향: {getWindDeg(Number(category.VEC))}</div>
          </div>
        )}
        {dustData && (
          <>
            <div>미세먼지: {dustGrade[Number(dustData.data.pm10)]}</div>
            <div>초미세먼지: {dustGrade[Number(dustData.data.pm25)]}</div>
          </>
        )}
      </>
    );
  } else {
    return <>에러</>;
  }
};

export default TodayWeather;
