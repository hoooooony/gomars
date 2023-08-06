import { styled } from "styled-components";
import React, { useRef, useState } from "react";

const InterestCoin = () => {
  return (
    <>
      <StyledInterestCoinCotainer>
        <StyledInterestCoinBox>
          <StyledInterestTitle>관심종목</StyledInterestTitle>
          <StyledTitleDivide></StyledTitleDivide>
        </StyledInterestCoinBox>
      </StyledInterestCoinCotainer>
    </>
  );
};
const StyledInterestCoinCotainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;
const StyledInterestCoinBox = styled.div`
  position: relative;
  flex-direction: column;
  margin-top: 20px;
  width: 80%;
  height: 239px;
  background-color: #f4f7f8;
`;
const StyledInterestTitle = styled.p`
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 20px;
  margin: 10px 0px 2px 2px;
  font-family: "HakgyoansimWoojuR";
`;
const StyledTitleDivide = styled.div`
  width: 100%;
  height: 1px;
  background-color: #b2b1b1;
  margin-top: 35px;
`;

export default InterestCoin;
