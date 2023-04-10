import React from "react";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";

const FooterList = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  background-color: rgba(12, 11, 19);
  padding: 20px;
  justify-content: space-around;

  span {
    color: white;
  }

  @media all and (max-width: 767px) {
    height: 250px;
    flex-direction: column;
  }
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;

  @media all and (max-width: 767px) {
  }
`;

const StyledButton = styled.button`
  width: 50px;
  height: 50px;
  z-index: 1000;
  background-color: white;
  border: 0px solid transparent;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const buttonClick = () => {
  window.open("https://github.com/KwaiiNeko/cointracker", "_blank");
};

const Footer = () => {
  return (
    <div>
      <FooterList>
        <TextSection>
          <span>고객센터</span>
          <span>1234-5678</span>
        </TextSection>

        <TextSection>
          <span>상담시간</span>
          <span>09:00 ~ 18:00 (평일)</span>
          <span>09:00 ~ 12:00 (주말)</span>
        </TextSection>

        <span>COPYRIGHT ©㈜CT. ALL RIGHTS RESERVED.</span>

        <StyledButton onClick={buttonClick}>
          <FaGithub />
        </StyledButton>
      </FooterList>
    </div>
  );
};

export default Footer;
