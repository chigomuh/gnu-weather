import type { NextPage } from "next";
import Head from "next/head";
import dfsXyConv from "components/functions/dfsXyConv";

const Home: NextPage = () => {
  const rs = dfsXyConv("toLL", 85, 95);
  console.log(rs);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Weather infomation site with GNU" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
