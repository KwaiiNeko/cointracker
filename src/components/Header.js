import React from "react";
import styled from "styled-components";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const SwitchButton = styled.button`
  width: 50px;
  height: 50px;
  z-index: 1000;
  background-color: ${props => props.theme.bgColor};
  border: 0px solid transparent;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${props => props.theme.btnBgColor};
    cursor: pointer;
  }
`;

const Header = ({ switchTheme, mode }) => {
  return (
    <header>
      <SwitchButton onClick={switchTheme}>
        {mode === 'dark' ? <BsMoonFill color="white"/> : <BsSunFill color="black"/>}  
      </SwitchButton>
    </header>
  );
};

export default Header;
