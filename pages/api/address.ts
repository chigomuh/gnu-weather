import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.KAKAO_API_KEY;

const baseUrl = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json";

const address = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { lat, lng },
  } = req;

  try {
    const response = await fetch(`${baseUrl}?x=${lng}&y=${lat}`, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    });
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
};

export default address;
