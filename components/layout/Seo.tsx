import Head from "next/head";

interface Props {
  title: string;
}

const Seo = ({ title }: Props) => {
  const titleText = `${title} | GNU Weather`;

  return (
    <Head>
      <title>{titleText}</title>
      <meta name="description" content="Weather infomation site with GNU" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Seo;
