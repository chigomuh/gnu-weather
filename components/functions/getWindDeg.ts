const windDirSix = [
  "북",
  "북북동",
  "북동",
  "동북동",
  "동",
  "동남동",
  "남동",
  "남남동",
  "남",
  "남남서",
  "남서",
  "서남서",
  "서",
  "서북서",
  "북서",
  "북북서",
  "북",
];

const windDirEight = [
  "북",
  "북동",
  "동",
  "남동",
  "남",
  "남서",
  "서",
  "북서",
  "북",
];
const getWindDeg = (deg: number) => {
  const transValue = Math.floor((deg + 45 * 0.5) / 45);

  return windDirEight[transValue];
};

export default getWindDeg;
