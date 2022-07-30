export const categories = {
  dangi: {
    POP: {
      description: "강수확률",
      unit: "%",
    },
    PTY: {
      description: "강수형태",
      unit: null,
      code: ["없음", "비", "비/눈", "눈", "소나기"],
      iconPath: [
        null,
        "/images/weather/sky/NB08.png",
        "/images/weather/sky/NB12.png",
        "/images/weather/sky/NB11.png",
        "/images/weather/sky/NB07.png",
      ],
    },
    PCP: {
      description: "1시간 강수량",
      unit: "mm",
    },
    REH: {
      description: "습도",
      unit: "%",
    },
    SNO: {
      description: "1시간 신적설",
      unit: "cm",
    },
    SKY: {
      description: "하늘상태",
      unit: null,
      code: [null, "맑음", null, "구름많음", "흐림"],
      day: {
        iconPath: [
          null,
          "/images/weather/day/NB01.png",
          null,
          "/images/weather/day/NB03.png",
          "/images/weather/day/NB04.png",
        ],
      },
      night: {
        iconPath: [
          null,
          "/images/weather/night/NB01_N.png",
          null,
          "/images/weather/night/NB03_N.png",
          "/images/weather/day/NB04.png",
        ],
      },
    },
    TMP: {
      description: "1시간 기온",
      unit: "℃",
    },
    TMN: {
      description: "일 최저기온",
      unit: "℃",
    },
    TMX: {
      description: "일 최고기온",
      unit: "℃",
    },
    UUU: {
      description: "풍속(동서성분)",
      unit: "m/s",
    },
    VVV: {
      description: "풍속(남북성분)",
      unit: "m/s",
    },
    WAV: {
      description: "파고",
      unit: "M",
    },
    VEC: {
      description: "풍향",
      unit: "deg",
    },
    WSD: {
      description: "풍속",
      unit: "m/s",
    },
  },
  chodangisil: {
    T1H: {
      description: "기온",
      unit: "℃",
    },
    RN1: {
      description: "1시간 강수량",
      unit: "mm",
    },
    UUU: {
      description: "동서바람성분",
      unit: "m/s",
    },
    VVV: {
      description: "남북바람성분",
      unit: "m/s",
    },
    REH: {
      description: "습도",
      unit: "%",
    },
    PTY: {
      description: "강수형태",
      unit: null,
      code: [
        "없음",
        "비",
        "비/눈",
        "눈",
        null,
        "빗방울",
        "빗방울눈날림",
        "눈날림",
      ],
    },
    VEC: {
      description: "풍향",
      unit: "deg",
    },
    WSD: {
      description: "풍속",
      unit: "m/s",
    },
  },
  chodangiyebo: {
    T1H: {
      description: "기온",
      unit: "℃",
    },
    RN1: {
      description: "1시간 강수량",
      unit: "mm",
    },
    SKY: {
      description: "하늘상태",
      unit: null,
      code: [null, "맑음", null, "구름많음", "흐림"],
    },
    UUU: {
      description: "동서바람성분",
      unit: "m/s",
    },
    VVV: {
      description: "남북바람성분",
      unit: "m/s",
    },
    REH: {
      description: "습도",
      unit: "%",
    },
    PTY: {
      description: "강수형태",
      unit: null,
      code: [
        "없음",
        "비",
        "비/눈",
        "눈",
        null,
        "빗방울",
        "빗방울눈날림",
        "눈날림",
      ],
    },
    LGT: {
      description: "낙뢰",
      unit: "㎢",
    },
    VEC: {
      description: "풍향",
      unit: "deg",
    },
    WSD: {
      description: "풍속",
      unit: "m/s",
    },
  },
};
