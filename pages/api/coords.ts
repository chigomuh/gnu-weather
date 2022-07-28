import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.KAKAO_API_KEY;
const baseUrl = "https://dapi.kakao.com/v2/local/search/address.json";

const coords = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { address },
  } = req;

  const data = await (
    await fetch(`${baseUrl}?query=${address}`, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    })
  ).json();

  const { x: lng, y: lat } = data.documents[0];

  res.status(200).json({
    success: true,
    data: {
      lat,
      lng,
    },
  });
};

export default coords;
