import type { NextApiRequest, NextApiResponse } from "next";

const weather = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { baseDate, baseTime, nx, ny, type },
  } = req;

  const API_KEY = process.env.WEATHER_API_KEY;

  const baseUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";

  let typeUrl: string;

  if (type === "chodangisil") {
    typeUrl = `${baseUrl}/getUltraSrtNcst`;
  } else if (type === "chodangiyebo") {
    typeUrl = `${baseUrl}/getUltraSrtFcst`;
  } else {
    typeUrl = `${baseUrl}/getVilageFcst`;
  }

  const URL = `${typeUrl}?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  const response = await fetch(URL);
  const data = await response.json();

  res.status(200).json({
    data,
  });
};

export default weather;
