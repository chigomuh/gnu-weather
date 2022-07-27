import useWeather from "hooks/useWeather";

const FutureWeather = () => {
  const { data, isLoading, isError } = useWeather(85, 95, "dangi");

  console.log(data);

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;
  return (
    <>
      <div>하하</div>
    </>
  );
};

export default FutureWeather;
