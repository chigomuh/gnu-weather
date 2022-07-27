const plusZero = (num: number): string => {
  return num === -1 ? "23" : num < 10 ? `0${num}` : num.toString();
};

export default plusZero;
