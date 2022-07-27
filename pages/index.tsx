import FutureWeather from "components/common/FutureWeather";
import TodayWeather from "components/common/TodayWeather";
import Seo from "components/layout/Seo";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Seo title="Home" />
      <div>홈</div>
      <TodayWeather />
      <FutureWeather />
    </>
  );
};

export default Home;
