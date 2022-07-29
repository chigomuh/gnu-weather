import Head from "next/head";

interface Props {
  title: string;
}

const Seo = ({ title }: Props) => {
  const titleText = `${title} | GNU Weather`;

  return (
    <Head>
      <title>{titleText}</title>
      <meta
        name="description"
        content="GNU 경상국립대학교(경상대학교)의 마스코트를 활용한 대한민국 날씨 정보와 미세먼지, 초미세먼지 등급 정보를 제공하는 서비스입니다."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Seo;
