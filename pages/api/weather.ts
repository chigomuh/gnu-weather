import getBaseDateTime from "components/functions/getBaseDateTime";
import plusZero from "components/functions/plusZero";
import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.KOREA_PUBLIC_DATA_API_KEY;

const baseUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";

const weather = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { baseDate, baseTime, nx, ny, type },
  } = req;

  let typeUrl: string;

  if (type === "chodangisil") {
    typeUrl = `${baseUrl}/getUltraSrtNcst`;
  } else if (type === "chodangiyebo") {
    typeUrl = `${baseUrl}/getUltraSrtFcst`;
  } else {
    typeUrl = `${baseUrl}/getVilageFcst`;
  }

  const URL = `${typeUrl}?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  if (type === "chodangiyebo") {
    try {
      const response = await fetch(URL);
      const data = await response.json();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);

      res.status(400).json({
        success: false,
        data: undefined,
      });
    }
  } else if (type === "chodangisil") {
    const today = new Date(Date.now());
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const baseDateY = `${yesterday.getFullYear()}${plusZero(
      yesterday.getMonth() + 1
    )}${plusZero(yesterday.getDate())}`;
    const baseTimeY = `${plusZero(today.getHours())}${plusZero(
      today.getMinutes() + 10
    )}`;

    const { baseDate: baseDateSky, baseTime: baseTimeSky } =
      getBaseDateTime("chodangiyebo");

    const URLY = `${typeUrl}?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDateY}&base_time=${baseTimeY}&nx=${nx}&ny=${ny}`;
    const URLSky = `${baseUrl}/getUltraSrtFcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDateSky}&base_time=${baseTimeSky}&nx=${nx}&ny=${ny}`;

    try {
      const response = await fetch(URL);
      const responseY = await fetch(URLY);
      const responseSky = await fetch(URLSky);
      const data = await response.json();
      const dataY = await responseY.json();
      const dataSky = await responseSky.json();

      res.status(200).json({
        success: true,
        data,
        dataY,
        dataSky,
        url: {
          URL,
          URLY,
          URLSky,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(400).json({
        success: false,
        data: undefined,
      });
    }
  } else if (type === "dangi") {
    try {
      const response = await fetch(URL);
      const data = await response.json();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);

      res.status(400).json({
        success: false,
        data: undefined,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      data: undefined,
    });
  }
};

export default weather;
