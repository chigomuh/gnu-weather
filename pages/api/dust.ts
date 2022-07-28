import { NextApiRequest, NextApiResponse } from "next";

const KAKAO_API_KEY = process.env.KAKAO_API_KEY;
const PUBLIC_API_KEY = process.env.KOREA_PUBLIC_DATA_API_KEY;

const baseUrlTM = "https://dapi.kakao.com/v2/local/geo/transcoord.json";
const baseUrlStation =
  "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList";
const baseUrlDust =
  "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty";

export const getPositionTM = async (
  baseUrl: string,
  apiKey: string | undefined,
  latitude: string,
  longitude: string
) => {
  try {
    const URL = `${baseUrl}?x=${longitude}&y=${latitude}&input_coord=WGS84&output_coord=TM`;
    const dataPositionTM = await (
      await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      })
    ).json();

    const { x: tmX, y: tmY } = dataPositionTM.documents[0];

    return {
      tmX,
      tmY,
    };
  } catch (error) {
    console.error(error);
    return {
      tmX: 0,
      tmY: 0,
    };
  }
};

const getNearStation = async (
  baseUrl: string,
  apiKey: string | undefined,
  tmX: string,
  tmY: string
) => {
  if (apiKey === undefined) {
    return {
      stations: "없음",
    };
  }
  try {
    const URL = `${baseUrl}?serviceKey=${apiKey}&returnType=JSON&tmX=${tmX}&tmY=${tmY}`;
    const dataNearStation = await (await fetch(URL)).json();

    const stations = dataNearStation.response.body.items;

    return {
      stations,
    };
  } catch (error) {
    console.error(error);

    return {
      stations: "없음",
    };
  }
};

const getDust = async (
  baseUrl: string,
  apiKey: string | undefined,
  stationName: string
) => {
  if (apiKey === undefined) {
    return {
      data: "없음",
    };
  }
  try {
    const URL = `${baseUrl}?serviceKey=${apiKey}&returnType=JSON&numOfRows=100&pageNo=1&stationName=${stationName}&dataTerm=DAILY&ver=1.3`;
    const data = await (await fetch(URL)).json();

    return {
      data: data.response.body.items[0],
      stationName,
    };
  } catch (error) {
    console.error(error);

    return {
      data: "없음",
    };
  }
};

const dust = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { lat, lng },
  } = req;

  if (typeof lat === "string" && typeof lng === "string") {
    const { tmX, tmY } = await getPositionTM(
      baseUrlTM,
      KAKAO_API_KEY,
      lat,
      lng
    );

    const { stations } = await getNearStation(
      baseUrlStation,
      PUBLIC_API_KEY,
      tmX,
      tmY
    );

    let pm10;
    let pm25;
    let station;

    for (let i = 0; i < stations.length; i++) {
      const {
        data: { pm10Grade, pm25Grade },
        stationName,
      } = await getDust(baseUrlDust, PUBLIC_API_KEY, stations[i].stationName);

      if (pm10Grade && pm25Grade) {
        pm10 = pm10Grade;
        pm25 = pm25Grade;
        station = stationName;
      }
    }

    const data = {
      pm10,
      pm25,
      station,
    };

    res.status(200).json({
      success: true,
      data,
    });
  } else {
    res.status(400).json({
      success: false,
      data: "check your query",
    });
  }
};

export default dust;
