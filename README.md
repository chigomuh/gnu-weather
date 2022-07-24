# 날씨 App

> 날씨와 미세먼지 정보를 제공합니다.

## 구현

- [ ] 학교 마스코트
- [ ] 현재 날씨, 미세먼지
- [ ] 미래 날씨, 미세먼지

## 기상청 API

[기상청-공공데이터포털](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084)

### 제공 정보

- 초단기실황조회
- - 예보 구역에 대한 AWS(자동기상관측장비) 관측 자료
- - 실시간 서비스 용도, 잘못된 관측 값이 나올 가능성이 있음
- 초단기예보조회
- - 예보시점부터 6시간까지의 자료
- 단기예보조회
- - 글피(3일 간)까지의 관측 자료 제공
- - 상세 예보단위(3시간 -> 1시간)

### 행정구역별 지점 좌표

> 기상청 제공 API에서는 위경도 값이 아닌 행정구역별 지점 좌표 사용해야 함  
> 따라서, 기상청에서 제공하는 엑셀 파일에서 값을 찾거나 변환 기능을 구현해야 함

[소스 출처](https://gist.github.com/fronteer-kr/14d7f779d52a21ac2f16)

```javascript
// components/functions/dfsXyConv.tsx

/**
 * 파라미터: code, x, y
 *
 * code: "toLL" | "toXY"
 *      "toLL": 위경도
 *      "toXY": 행정구역별 지점 좌표
 * x: latitude(위도)
 * y: longitude(경도)
 *
 * return rs | errorMessage
 * rs: {
 *  lat: latitude(위도)
 *  lon: longitude(경도)
 *  x: 행정구역별 지점 좌표 X
 *  y: 행정구역별 지점 좌표 Y
 * }
 */

// use example
dfsXyConv("toLL", 55, 127);
```
