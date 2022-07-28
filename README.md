# 날씨 App

> 날씨와 미세먼지 정보를 제공합니다.

## 구현

- [ ] 학교 마스코트
- [x] 현재 예보, 현재 미세먼지, 초미세먼지 등급
- [x] 단기 예보

## 기능 구현

### 검색

<img src="https://user-images.githubusercontent.com/84620459/181521924-2fbc187f-c6a7-4b0d-9e72-c876060a3c14.gif" width="500" height="500" />

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

## 학습 내용

### 객체 키와 값 추가 시 String으로 접근하지 못하는 문제 -- typescript

> `에러 메시지`  
> Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. No index signature with a parameter of type 'string' was found on type '{}'.

```javascript
// const이므로 string type이 아닌 더 구체적이다. "this is string" type
const a = "this is string";

// let이므로 string의 모든 가능성을 열어둔다. string type
let b = "this is string";
```

- Javascript에서는 런타임 전 `obj[somekey] = somevalue => obj["somekey"] = somevalue`로 obj의 key값을 자동으로 `string`으로 변환해준다.
- Typescript에서는 자동으로 변환해주지 않기 때문에 key값의 type이 `string | number`이어야 한다.

#### 해결

```javascript
// type을 동적으로 추가한다.
// value type은 해당하는 type으로 할당하면 된다.
// 나의 경우에는 객체를 받으므로 {}을 할당했다.
const obj: {
  [key: string]: {},
} = {};
```

> 참고  
> [`yyeonjju.log`](https://velog.io/@yyeonjju/TypeScript-Index-Signature-string-key%EB%A1%9C-%EA%B0%9D%EC%B2%B4%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%98%EA%B8%B0)

### 배포 시 origin 설정 문제

> 개발 환경에서는 Next.js 자체의 api 호출 시 `http://localhost:3000`을 origin으로 사용하는 반면에 배포 환경에서는 배포한 도메인 origin으로 설정해야 한다.  
> .env.local 파일을 만들고 개발 환경에서는 `localhost`를 사용하고 배포 환경에서는 vercel에 환경 변수로 도메인을 설정하여 해결하였다.

### 배포 시 Date API가 KST가 아닌 UTC로 적용되는 문제

> 개발 환경에서는 자동으로 현재 위치를 기준으로 Date의 기준이 설정된다.  
> 한국 기준은 KST로 UTC + 9시간이다. vercel로 배포를 하면 기준시간이 UTC로 설정되어 예상한 현재 시간을 기준으로 각각의 API를 호출하지 못했다. 한국을 기준 시간으로 정하여 해결 했다.

- moment-timezone 라이브러리 사용

```shell
npm install moment-timezone --save
```

```javascript
import moment from "moment-timezone";

const koreaTime = moment().tz("Asia/Seoul"); // yyyy-mm-dd
```
