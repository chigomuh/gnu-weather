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

import { categories } from "components/configs/weather";
import dfsXyConv from "components/functions/dfsXyConv";
import useWeather from "hooks/useWeather";

const TodayWeather = () => {
  const xy = dfsXyConv("toXY", 36.087965369324, 128.36956444318);

  const { data, isLoading, isError } = useWeather(85, 95, "chodangisil");

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;

  return (
    <>
      {data && (
        <div>
          <div>현재기온: {data.categories.T1H}℃</div>
          <div>
            <div>기온차이: {`어제보다 ${data.categories.DIF}℃`}</div>
            <div>
              하늘상태:{" "}
              {categories.chodangiyebo.SKY.code[Number(data.categories.SKY)]}
            </div>
          </div>
          <div>습도: {data.categories.REH}%</div>
        </div>
      )}
    </>
  );
};

export default TodayWeather;
