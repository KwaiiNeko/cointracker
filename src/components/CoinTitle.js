import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 70%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;

  button {
    width: fit-content;    
    height: fit-content;
    margin: auto;
  }

  input{
    width: 20%;
    margin: auto;
    background-color:transparent;
    border: ${props => props.theme.borderColor};
    @media all and (max-width: 767px) {
      width: 50%;
    }   
  }

  input::placeholder {
  color: ${props => props.theme.textColor};
}
`;

const CoinTitle = (props) => {
  const HandleChange = (e) => {
    props.setData(e.target.value);
  }

  return (
    <StyledDiv>
      <h1>암호화폐 실시간 TOP 100</h1>
      <button onClick={()=>{
        props.CallApi();
      }}>
        <FiRefreshCcw />
      </button>
      <input value={props.value} onChange={HandleChange} placeholder="종목 이름을 검색하세요."></input>
    </StyledDiv>
  );
};

export default CoinTitle;
