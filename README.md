# cointracker

## 1. Project Intro

### 1-1. 프로젝트 소개
- 암호화폐의 현재시세와 차트를 통한 시세변동 확인 
- 유튜브나 인터넷강의 없이 본인이 직접 제작
- 오픈 Api - 코인파프리카 (https://api.coinpaprika.com/)를 사용하여 제공받은 데이터를 사용
- https://github.com/KwaiiNeko/cointracker
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

- 다크/라이트 모드
- 슬라이드
- API 호출
- 차트를 통한 데이터 시각화
- Cookie 데이터 저장
- 모달창

### 2-1. 풀페이지 스크롤 화면이동<br>
기존의 풀페이지 라이브러리 없이 Vanila JavaScript로 구현하기 위해 scrollTo 함수를 만들었습니다. 마우스 휠 스크롤, 모바일 드래그 한번당 한페이지씩 애니메이션으로 화면이 이동합니다.

```
const scrollTo = (yPos, duration = 600) => {
  // Easing function from https://gist.github.com/gre/1650294
  const easeOutCubic = (t) => --t * t * t + 1;
  const startY = window.scrollY;
  const difference = yPos - startY;
  const startTime = performance.now();

  const move = () => {
    const progress = (performance.now() - startTime) / duration;
    const amount = easeOutCubic(progress);
    window.scrollTo({ top: startY + amount * difference });
    if (progress < 0.99) {
      window.requestAnimationFrame(move);
    }
  };

  move();
};
```

### 2-2. 모바일 브라우저별 vh수치 조절<br>
모바일 브라우저 별 상단의 url바와 하단의 네비게이션바의 차이로 인해 100vh가 제대로 적용되지 않는 문제가 있어 vh를 직접 계산하여 적용시켰습니다.
또한 화면크기의 변화와 url바, 네이게이션바의 변화에 대응하기 위해 resize 이벤트시에도 vh를 다시 계산하여 적용시키는 방식을 사용했습니다.
```
function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener("resize", () => {
  setScreenSize();
});

height: 100vh;
height: calc(var(--vh, 1vh) * 100);
```

### 2-3. 모바일 스와이프(드래그) 방향 인식<br>
당연히 기본적인 기능으로 제공되어 있을것이라고 생각한 모바일에서 스와이프 시 방향 인식에 대한 기능이 없어 당황했습니다.
모바일 유저가 처음 터치한 위치와 손을 뗀 위치의 좌표를 계산하여 스와이프 방향을 인식합니다.
매우 빠른속도로 휠 스크롤과 스크린 드래그가 인식되어 문제가 발생하여 쓰로틀링을 적용시켜 이벤트 인식을 제한했습니다.

```
document.addEventListener("touchend", (e) => {
    endPoint = e.changedTouches[0].pageY; // 터치가 끝나는 위치 저장
    if (startPoint < endPoint) {
        // 위로 스와이프 된 경우
        const clientHeight = window.innerHeight;

        // 쓰로틀링 적용
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;

                if (currentPage == 1) return;
                else {
                    currentPage--;
                    window.scrollBy(0, -clientHeight);
                    screenLayout(currentPage);
                }
            }, 500);
        }
    } else if (startPoint > endPoint) {
        // 아래로 스와이프 된 경우
        const clientHeight = window.innerHeight;

        // 
        쓰로틀링 적용
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;

                if (currentPage == 8) return;
                else {
                    currentPage++;
                    window.scrollBy(0, clientHeight);
                    screenLayout(currentPage);
                }
            }, 500);
        }
    }
});
```

### 2-4. 마우스 휠 클릭으로 화면이동 막기<br>
풀페이지에서 마우스 휠 클릭시 나오는 기능으로 화면을 빠르게 이동하게 되면 의도한 바와 다르게 화면이 이동되는 문제가 발생하여 기본 마우스 휠 클릭을 제한합니다.

```
document.addEventListener("mousedown", (event) => {
    if (event.button == 1) {
        event.preventDefault();
    }
})
```

### 2-5. 접속 디바이스 확인<br>
접속한 유저가 PC인지 모바일인지, 모바일이라면 안드로이드인지 아이폰인지에 따라 제공해야 하는 서비스(앱스토어 링크 제공)가 다르므로 접속 디바이스를 확인하는 함수를 사용했습니다.

```
function checkMobile() {
  const mobileVerification = navigator.userAgent.toLowerCase();

  let mobileType;

  if (mobileVerification.indexOf("android") > -1) {
    mobileType = "AOS";
    return mobileType;
  } else if (
    mobileVerification.indexOf("iphone") > -1 ||
    mobileVerification.indexOf("ipad") > -1 ||
    mobileVerification.indexOf("ipod") > -1
  ) {
    mobileType = "IOS";
    return mobileType;
  }
}
```

### 2-6. 애니메이션<br>
각 메인페이지의 이미지 이동 애니메이션 구현을 위해 CSS @keyframes을 사용했고, 풀페이지 이동을 위해 window.requestAnimationFrame을 사용했습니다.

```
.main .image.active {
    animation: slide1 1s ease-in-out;
}

@keyframes slide1 {
    from {
        left: 40%;
        bottom: 400px;
    }

    to {
        left: 50%;
        bottom: 0;
    }
}
```

## 3. Review

### 3-1. 풀페이지<br>
프로젝트 시작 전, 인터넷에 이번 프로젝트의 가장 핵심 기능인 풀페이지에 관해 검색해본 적이 있었습니다. 그리고 단 하나도 빠짐없이 모든 글들이 **"풀페이지 구현 도중 실패했습니다. Fullpage.js 라이브러리 사용합니다."** 라는 글 뿐이었습니다.

**그래서 이번 프로젝트를 시작하면서 차라리 실패하더라도 왜 사람들이 라이브러리를 반드시 사용하는지, 어떠한 점에서 문제가 발생하는지, 그리고 그 문제를 해결하려고 노력하는 과정에서의 실력 향상과 적절한 라이브러리의 사용 필요성에 대해 직접 경험해보고자 진행했습니다.**<br>
그 결과 아래와 같은 문제점을 겪었습니다.

>문제점 1. 브라우저 별 반응이 다름.<br>
>처음에는 단순히 scrollBy에 behavior : 'smooth'를 사용하여 풀페이지 애니메이션을 구현했습니다.
>```          
>window.scrollBy({
>top: clientHeight,
>left: 0,
>behavior : 'smooth',
>});
>```
>하지만 동일한 코드임에도 불구하고 네이버 웨일브라우저에서는 스크롤 시 화면이동 속도가 유독 빨랐고, 모바일 삼성 인터넷 브라우저에서는 스크롤 시 정상적으로 작동하다가 중간에 갑자기 화면이 튀어버리는 버그가 발생했습니다. <br>
>그 후 2-1로 구현하여 네이버 웨일에서의 문제점은 해결했으나, 끝까지 모바일 삼성 인터넷 브라우저에서는 버그가 발생했습니다.

>문제점 2. 모바일에서의 작동 오류발생<br>
>100% 정석적인 행동으로 화면을 사용하면 작동에는 문제가 없습니다.
>하지만 모바일에서 스크롤을 매우 빠른속도로 연타한다거나, 새로고침을 미친듯이 한다거나, 여러 손가락으로 동시에 화면을 터치하는 등의 예외적인 상황에서는 의도하지 않은 여러가지 문제점>들이 발생했습니다.

>문제점 3. 모바일 브라우저 별 url Bar, nav Bar 크기로 인한 100vh 오류<br>
>풀페이지를 위해 각 페이지의 height를 100vh로 적용하여 프로젝트를 진행했으나 카카오톡 인앱브라우저, 삼성 인터넷 브라우저 등에서 100vh가 정상적으로 적용되지 않아 화면이 이상하게 잘>리는 문제가 발생했습니다.
>그 후 2-2로 구현하여 문제점을 해결했습니다.


### 3-2. 크로스 브라우징<br>
위의 문제점과 연결된다고 볼 수 있을 것 같습니다.
PC만 하더라도 크롬, 웨일, 파이어폭스, 오페라 등이 있을 뿐만 아니라 모바일로 영역을 넓힌다면 더욱 답이 없어집니다. 안드로이드 크롬, 웨일, 엣지, 파이어폭스, 삼성인터넷브라우저와 애플의 사파리, 카카오톡의 인앱브라우저 등이 있습니다.

프로젝트 시작 전만 하더라도 만악의 근원 인터넷 익스플로러가 없어졌기 때문에 이제는 큰 문제가 되지 않을것이라고 생각하고 진행했습니다.
아주 오래된 코드나 너무 최신의 코드만 사용하지 않으면 문제가 되지 않을것이라고 생각했고, 반응형으로 제작할 것을 생각해서 크기만 잘 조절해주면 문제가 없을것이라고 생각했습니다.

하지만 브라우저별 url Bar, nav Bar의 크기와 존재여부가 다르고, 같은 코드도 실행에 문제가 발생하는 브라우저가 생기고, 각 브라우저별로 개인설정이 따로 들어가는 등 생각보다 문제가 많았습니다.

### 3-3. 반응형 웹<br>
처음 프로젝트를 시작할 때 PC버전을 우선하여 만들고, PC버전이 완성되면 그때 미디어 쿼리를 이용하여 사이즈와 존재여부만 건들면 된다고 생각했습니다.

그래서 웹 제작 당시 px단위를 남발하여 우선 웹부분을 완성하는데 집중하였고,
웹 완성 이후에 모바일을 끼워맞추기 시작하면서 잘못되었음을 인식했습니다.

앞으로는 PC버전을 만들때 모바일을 미리 생각하여 적절한 %, vw, vh, em, rem등 적절한 단위를 사용해야 한다고 느꼈습니다.

### 3-4. 마우스 스크롤 이벤트 쓰로틀링<br>
이번에 마우스 휠 이벤트를 사용하면서 휠을 드르륵 3번하면 당연히 이벤트도 3번 호출될 것이라고 생각했었습니다. 하지만 콘솔 로그를 통해 확인해본 결과 드르륵 3번에도 수십, 수백번이 짧은 순간에 호출되어 예상했던 결과와 다른 문제가 발생하는 것을 확인할 수 있었습니다.
스크롤 발생 시 쓰로틀링을 걸어 실행에 제한을 두는 방식으로 문제를 해결했습니다.
<br>

## 4. 최종결론
프로젝트 완성도에 만족하느냐? 라고 한다면 만족할 수 없다고 대답할 것입니다. 
원래 목표였던 PC에서는 문제없이 원하는 100%를 달성했다고 생각하지만, 생각보다 모바일에 대해서는 부족함을 많이 느꼈습니다.

지금 당장 개인으로는 여기서 더 혼자서 시간을 갈아넣고 인터넷을 조사해본다고 한들 모바일 크로스브라우징에 대한 해결책은 찾기 어려울것이라고 생각합니다.
이번 프로젝트를 진행하면서 가장 많은 시간을 잡아먹었지만 해결하지 못한 부분이라고 생각하고, 직접 경험을 통해 해결 할 수 있는 회사나 사수분을 만나 이러한 문제를 해결하는 방법을 배우고 싶습니다.
