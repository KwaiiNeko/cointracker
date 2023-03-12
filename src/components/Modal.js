import React from "react";
import styled from "styled-components";
import useCookies from "./useCookies";

const StyledContainer = styled.div`
  z-index: 1000000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

const ModalBody = styled.div`
  position: absolute;
  width: 300px;
  height: 500px;
  padding: 40px;
  text-align: left;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

  @media screen and (max-width: 768px) {
    width: 250px;
    height: 400px;
  }
`;

const ClosedButton = styled.button`
  position: absolute;
  width: 80%;
  height: 10%;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const ModalTitle = styled.p`
  font-size: 1.17em;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 1em;
    font-weight: bold;
  }
`;

const DayClosedButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const StyledText = styled.div`
  width: 100%;
  height: 70%;
  padding: 5px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px; /* 스크롤바의 두께 */
  }
  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: gray; /* 스크롤바의 색상 */

    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1); /* 스크롤바 뒷 배경 색상 */
  }
`;

const StyledSection = styled.span`
  width: 95%;
  height: 1px;
  background-color: gray;
  margin: 10px 0px;
  display: block;
`;

const Modal = ({ setModalOpen }) => {
  document.body.style.overflow = "hidden";
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const [setCookie, getCookie, deleteCookie] = useCookies();

  return (
    <StyledContainer>
      <ModalBody>
        <DayClosedButton onClick={closeModal}>X</DayClosedButton>
        <ModalTitle>가상자산 거래에 관한 위험 고지</ModalTitle>
        <StyledText>
          <p>
            본 고지는 회원님들이 가상자산을 거래하거나 보유할 때 발생할 수 있는
            대표적인 위험을 안내하기 위함입니다. 가상자산거래는 손실에 대한
            위험이 매우 클 수 있으므로 회원님은 가상자산거래시 본인의 투자목적,
            재산상황, 거래(투자)경험 등을 감안하시고 아래 유의 사항을 충분히
            인지 후 거래 하시기 바랍니다.
          </p>
          <StyledSection></StyledSection>
          <p>
            가상자산 투자 유의 사항 가상자산은 법정화폐가 아니므로 특정주체가
            가치를 보장하지 않습니다. 가상자산은 365일 24시간 전 세계에서
            거래되며, 시장의 수요 및 공급, 각 가상자산의 정책, 국가별 법령 및
            제도, 네트워크 상황 등 다양한 요인으로 급격한 시세 변동이 발생할 수
            있습니다. 가상자산은 가격 변동폭에 제한이 없으므로, 원금손실
            가능성이 있음을 특히 유의하시기 바랍니다. 가상자산은 초고위험
            상품으로 투자자 자기책임 원칙이 우선되는 만큼, 회원님이 투자하려는
            가상자산의 정보를 백서 또는 평가보고서 등을 통해 충분히 확인한 후에
            신중히 투자 결정하시기 바라오며, 과도한 투자를 지양하고 여유자금으로
            분산투자 하는 것을 권유 드립니다. 본 거래소도 회원님들에게 안전한
            투자환경을 제공하기 위해 가상자산의 거래지원에 보다 유의하고,
            회원님들께 최신의 정보를 제공하기 위해 노력하겠습니다. 위 사항들은
            가상자산 거래에 수반되는 위험 등에 대해 회원님이 알아야 할 사항을
            간략하게 서술한 것으로 가상자산 거래와 관련된 모든 위험을 기술 한
            것은 아닙니다. 또한 본 고지 내용은 거래소의 이용약관이나 국내외
            관련법규 등에 우선하지 못한다는 점을 양지하여 주시기 바랍니다.
          </p>
        </StyledText>
        <ClosedButton
          onClick={() => {
            setCookie("modalYN", "N", 1);
            closeModal();
          }}
        >
          오늘 하루 이 창 열지않기
        </ClosedButton>
      </ModalBody>
    </StyledContainer>
  );
};

export default Modal;
