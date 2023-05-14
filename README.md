# cointracker

## 1. Project Intro

### 1-1. 프로젝트 소개
- 암호화폐의 현재시세와 차트를 통한 시세변동 확인 
- 유튜브나 인터넷강의 없이 본인이 직접 제작
- 사이트와 어울리면서도 최대한 많은 기능들을 적용해 볼 것을 목표로 진행
- 오픈 Api - 코인파프리카(https://api.coinpaprika.com/) 를 사용하여 제공받은 데이터를 사용
<br>

### 1-2. 구성원
- 개인 프로젝트
<br>

### 1-3. 적용기술
- html
- CSS
- JavaScript
- React
<br>

### 1-4. 라이브러리
- axios 1.2.0
- chart.js 4.0.1
- react-router-dom v6 6.4.4
- react-slick 0.29.0
- styled-components 5.3.6
- react-icons 4.7.1
<br>

### 1-5. IDE
- Visual Studio Code
<br>

## 2. 주요 기능

### 2-1. API 호출<br>
async와 await, axios를 사용하여 오픈 API를 호출합니다. useEffect를 사용하여 마운트될때 API를 호출하며 코인파프리카(https://api.coinpaprika.com/) 에서 제공받은 데이터를 화면에 출력합니다. 받아오는 데이터의 양이 너무 많아 slice를 통해 TOP 100개로 제한했습니다.

```
  const fetchCoins = async () => {
    try {
      const response = await axios.get(
        "https://api.coinpaprika.com/v1/tickers?quotes=KRW"
      );

      setCoins(response.data.slice(0, 100));
    } catch (e) {}
  };

  useEffect(() => {
    fetchCoins();
  }, []);
};
```

### 2-2. 차트를 통한 데이터 시각화<br>
암호화폐에 있어 가장 중요한 것은 주기적으로 변동되는 많은 데이터를 얼마나 시각적으로 제공할 수 있는가 라고 생각합니다. chart.js와 D3 라이브러리 중 어떤 것을 사용할지 고민했으나 커스터마이징이 많이 필요한 경우 D3, 단순히 주어진 데이터를 보여주는 정도에서는 chart.js를 사용한다고 하여 chart.js를 선택했습니다.<br>
https://www.chartjs.org/docs/latest/charts/line.html 에서 원하는 차트유형을 선택한 후 그에 맞는 데이터와 차트옵션을 지정하여 사용합니다.
X축은 labels값, Y축은 data값이 됩니다.
```
<Line data={dataset} />

 const [dataset, setDataSet] = useState({
    labels: !interval1hour
      ? null
      : interval1hour.map((day) => new Date(day.timestamp).toLocaleString()),
    datasets: [
      {
        type: "line",
        label: "가격(USD)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: !interval1hour ? null : interval1hour.map((day) => day.price),
      },
    ],
  });

```

### 2-3. 다크/라이트 모드<br>
스마트폰과 같은 디바이스의 사용량이 증가하면서, 눈의 피로를 덜어주고 집중력을 높여준다는 이유로 다크모드가 등장했습니다. 현재는 수많은 웹사이트들이 다크모드를 기본 옵션으로 제공하고 있으며, 이제는 프론트엔드의 필수 항목이라고 생각했습니다. <br>
theme.js를 통해 다크/라이트 모드의 배경색, 글자색, 테두리색, 버튼배경색 등을 지정하고 ThemeProvider를 통해 프로젝트 전체에 theme값을 전달합니다. GlobalStyle로는 전체의 배경색과 글자색을 지정했습니다.
```
      <ThemeProvider theme={theme}>
        <GlobalStyle></GlobalStyle>
        <Header switchTheme={switchTheme} mode={mode} />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<CoinListPage />} />
            <Route path="/coin/:id" element={<CoinItemPage />} />
          </Routes>
        </BrowserRouter>
        <Footer></Footer>
      </ThemeProvider>
      
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    
    const switchTheme = () => {
      const nextTheme = theme === lightTheme ? darkTheme : lightTheme;
      setTheme(nextTheme);
      const themeMode = mode === "light" ? "dark" : "light";
      setThemeMode(themeMode);
  };
```

### 2-4. 슬라이드<br>
react-slick 라이브러리를 사용하여 슬라이드를 구현했습니다. 라이브러리에서 지정한 각종 옵션들을 통해 원하는 기능들을 세팅할 수 있습니다. 3개의 이미지를 제공하고, 이미지를 클릭하면 연결되어 있는 링크로 이동합니다. 평소에는 자동으로 슬라이드가 넘어가다가 마우스를 hover하면 정지합니다.

```
  // 슬라이드 설정
  const settings = {
    dots: false, // 슬라이드 밑에 점 보이지 않게
    arrows: false,
    infinite: true, // 무한으로 반복
    speed: 500,
    autoplay: true, // 자동재생 o
    autoplaySpeed: 3000, // 넘어가는 속도
    slidesToShow: 1, // 1장씩 보이게
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    centerMode: true,
    centerPadding: "-1px", // -1px 하면 슬라이드 끝쪽 이미지가 안잘림
    touchThreshold: 100,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
  };
  
     <StyledCarousel ref={sliderRef} {...settings}>
        {linkImgs.map((item) => (
          <CardBox>
            <CardImg
              src={item.Img}
              onClick={() => {
                handleClickImgs(item.pageLink);
              }}
            />
          </CardBox>
        ))}
      </StyledCarousel>
```

### 2-5. 모달창<br>
공지사항, 광고, 업데이트 안내 등 모달창을 사용하는 웹사이트가 많아 구현해보았습니다. useEffect를 사용하여 마운트될때 쿠키에서 이전에 "오늘 하루 이 창 열지않기" 로 최근 하루동안 모달창을 닫은 적이 있는지 확인하고 없다면 모달창을 보여줍니다. 닫기버튼을 클릭하거나 "오늘 하루 이 창 열지않기" 버튼을 클릭하면 setModalOpen에 false값을 전달하여 모달창을 닫습니다.

```
  useEffect(() => {
    if (getCookie("modalYN") === "N") {
      setModalOpen(false);
      document.body.style.overflow = "unset";
    }
  }, []);
  
  {modalOpen && <Modal setModalOpen={setModalOpen} />}
  
    const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "unset";
  };
  
```

### 2-6. Cookie 데이터 저장<br>
2-5 모달창의 "오늘 하루 이 창 열지않기" 기능을 구현하면서 useCookies 커스텀훅을 직접 제작했습니다. JSDoc을 작성하여 코드를 확인하지 않고도 기능을 파악할 수 있도록 했습니다. 
쿠키저장, 쿠키조회, 쿠키삭제 기능을 만들었습니다.

```
const useCookies = () => {
  /**
   * Cookie의 값을 세팅해주는 함수
   * @param {string} cookieName : 쿠키의 이름
   * @param {string} cookieValue : 쿠키의 값
   * @param {number} expiresHour : 쿠키의 만료일
   * @return {void}
   */
  const setCookie = (cookieName, cookieValue, expiresHour) => {
    const expired = new Date();
    expired.setTime(expired.getTime() + expiresHour * 24 * 60 * 60 * 1000);
    document.cookie = `${cookieName}=${cookieValue}; path=/; Expires=${expired}`;
  };

  /**
   * Cookie의 값을 반환해주는 함수
   * @param cookieName
   * @returns {string} cookie value
   */
  const getCookie = (cookieName) => {
    let result = "";
    // 1. 모든 쿠키를 가져와서 분리 함
    document.cookie.split(";").map((item) => {
      // 2. 분리한 값의 앞뒤 공백 제거
      const cookieItem = item.trim();
      // 3. 키 값과 매칭이 되는 값을 반환
      if (item.includes(cookieName)) {
        result = cookieItem.split("=")[1];
      }
    });
    return result; // 존재하면 값을 반환, 미 존재하면 빈값 반환
  };

  /**
   * Cookie의 값을 삭제 해주는 함수
   * @param {string} cookieName : 쿠키의 이름
   * @return {void}
   */
  const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=0; max-age=0`;
  };

  return [setCookie,getCookie,deleteCookie];
};

export default useCookies;


  <ClosedButton
    onClick={() => {
    setCookie("modalYN", "N", 1);
    closeModal();
    }}>
      오늘 하루 이 창 열지않기
  </ClosedButton>

```

## 3. 핵심 트러블슈팅

### 3-1. 리액트<br>

SPA, JSX, 렌더링, 컴포넌트, Virtual DOM, State, Props, 각종 React Hook 등 리액트를 처음 도입하면서 기존의 프론트엔드 개발과 다른 개념이 많아 고생했습니다. 
특히 개발 초반에는 변수와 state의 차이점과 그로인해 리렌더링 되는 개념이 자바스크립트와 달라 매우 헷갈렸습니다.
사실 이번 프로젝트를 진행하면서 위의 개념들을 전부 마스터 했다고는 할 수 없지만 책, 인터넷 강의로 개념만 공부했을 때 보다는 이해도가 확실히 높아졌습니다.
프로젝트 진행을 목표로 학습하다보니 개념적인 부분보다는 사용방법을 우선시하였기 때문에 개념적인 부분에서의 학습이 좀 더 필요하다고 느꼈습니다.
그 외에도 이번에 적용해보지 못한 React-Query와 상태관리 라이브러리 Recoil Redux MobX 도 이후에 적용시켜보고 싶습니다.

### 3-2. 슬라이드 클릭시 autostop<br>
슬라이드의 이미지를 클릭하면 새 탭(페이지)이 열리면서 autoplay: true, // 자동재생 o 로 설정해놓았던 슬라이드의 자동재생이 멈추는 버그가 존재했습니다.
useRef hook을 사용하여 이미지를 클릭하여 새 탭이 열릴 때 자동재생을 다시 설정시켜 문제를 해결했습니다.

```
      <StyledCarousel ref={sliderRef} {...settings}>
        {linkImgs.map((item) => (
          <CardBox>
            <CardImg
              src={item.Img}
              onClick={() => {
                handleClickImgs(item.pageLink);
              }}
            />
          </CardBox>
        ))}
      </StyledCarousel>
    
    const sliderRef = useRef(null);
    
    const handleClickImgs = (item) => {
      if (!dragging) {window.open(item, "_blank");
      sliderRef.current.slickPlay();
  }
```

## 4. 그 외 트러블슈팅

### 4-1. 숫자 콤마 표기<br>
가격, 총 시가, 거래량 등 단위가 큰 숫자가 많아 가시성이 좋지 않다는 피드백을 반영하여 숫자에 콤마를 표기하거나 kilo(천,k), million(백만,m), billion(10억,b), trillion(1조,t) 로 변환하여 표기했습니다.
```
<td>￦{Number(coin.quotes.KRW.price.toFixed(2)).toLocaleString('ko-KR')}</td>

  /**
   * k,m,b 숫자단위 계산. 소수점 2자리 표시
   * @param {number} num 항목에 대한 고유 식별자
   * @returns {string} 소수점 제거값 + 단위(kmb)
   */
  const kmbtCalc = (num) => {
    if (num < 1000000) return `${(num / 1000).toFixed(2)}k`;
    if (num < 1000000000) return `${(num / 1000000).toFixed(2)}m`;
    if (num < 1000000000000) return `${(num / 1000000000).toFixed(2)}b`;
  };
```

### 4-2. 모바일에서 table 정보 가시성 문제<br>
화면이 작은 모바일에서 많은 데이터 정보를 전달하다보니 가시성이 좋지 않다는 피드백을 반영하여 모바일에서는 table 정보 중 몇가지 데이터를 숨기고 주요 데이터만 출력했습니다.
```
  @media all and (max-width: 767px) {
    font-size: 13px;

    td:nth-child(5) {
      display: none;
    }

    th:nth-child(5) {
      display: none;
    }

    td:nth-child(6) {
      display: none;
    }

    th:nth-child(6) {
      display: none;
    }
  }
```

## 5. 최종결론
처음에는 API 호출을 통해 암호화폐 데이터를 화면에 뿌려주는 정도로 구현해서 React의 기본 흐름만 이해하고자 했습니다. 하지만 구현을 진행하면서 이러면 '단순히 인터넷에 넘쳐나는 API 호출 강의 따라하기나 다를게 없는게 아닐까?' 라는 생각이 들었습니다. 그래서 만약 실제로 암호화폐 웹사이트를 서비스하게 된다면 꼭 들어가야 하는 기능들을 추가해보자는 생각으로 하나둘씩 붙여나갔습니다.
그 결과 차트, 다크모드, 슬라이드, 모달창, 쿠키 등 많은 기능들을 추가해서 좀 더 알찬 프로젝트가 되었다고 생각합니다. 이 이상으로는 실력이 부족해서 추가하지 못한 것보다는 API가 제공하는 무료데이터의 한계와 더는 추가할만한 유용한 기능이 생각나지 않았습니다.
이번 프로젝트를 통해 React의 전체적인 흐름과 각종 라이브러리 적용방법, React Hooks, 컴포넌트 등 React를 사용하여 원하는 것을 제작할 정도의 수준을 학습했습니다.
입사하게 되면 좀 더 규모가 큰 프로젝트를 진행하면서 상태관리 라이브러리의 사용, useMemo & useCallback 등을 사용한 최적화, 깃과 깃허브를 사용한 협업, TypeScript를 적용한 안정적인 코드를 만들어보고 싶습니다.
