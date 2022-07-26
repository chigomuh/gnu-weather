const plusZero = (num: number): string => {
  if (num === -1) {
    return "23";
  } else if (num < 10) {
    return `0${num}`;
  } else {
    return num.toString();
  }
};

export default plusZero;
