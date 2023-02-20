import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div``;

// 라이브러리 기본 CSS 변경
const StyledCarousel = styled(Slider)`
  width: 70%;
  margin: 0 auto;

  *:focus {
    outline: 0;
    outline: none;
  }

  .slick-prev:before {
    color: black;
  }
  .slick-next:before {
    color: black;
  }
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 100%;
  height: 20vh;
`;

const linkImgs = [
  {
    Img: "https://static.upbit.com/upbit-pc/seo/upbit_facebook.png",
    pageLink: "https://www.upbit.com",
  },
  {
    Img: "https://content.bithumb.com/resources/img/comm/seo/20200701_og_bithumb.png?v=bithumb2.0",
    pageLink: "https://www.bithumb.com",
  },
  {
    Img: "https://image-public.coinone.co.kr/og/og_corp.png",
    pageLink: "https://coinone.co.kr",
  },
];

const Carousel = () => {
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, []);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, []);

  const handleClickImgs = (item) => {
    if (!dragging) {window.open(item, "_blank");
    sliderRef.current.slickPlay();
  }
    
  };

  // 슬라이드 설정
  const settings = {
    dots: false, // 슬라이드 밑에 점 보이게
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

  return (
    <Container>
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
    </Container>
  );
};

export default Carousel;
