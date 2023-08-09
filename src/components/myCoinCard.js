import React from "react";
import styled from "styled-components";
import useCoinListStore from "../store/coinListStore";

const MyCoinCard = ({ market, name, avg_buy_price }) => {
  const { krwMarketDetail } = useCoinListStore();
  const marketDetail = krwMarketDetail.find((item) => item.market === market);
  const currentTradePrice = marketDetail?.trade_price;

  const profitRate =
    ((currentTradePrice - avg_buy_price) / avg_buy_price) * 100;

  return (
    <StyledMyCoinCard>
      <StyledInfoBox>
        <StyledCardTitle>{name}</StyledCardTitle>
        <div>매수 평균가: {avg_buy_price}₩</div>
        <StyledProfitRate rate={profitRate.toFixed(2)}>
          이익율: {profitRate.toFixed(2)}%
        </StyledProfitRate>
      </StyledInfoBox>
      <StyledImageBox>
        <img
          style={{ width: "80px", height: "80px" }}
          src="image/dogeCoin.png"
        />
      </StyledImageBox>
    </StyledMyCoinCard>
  );
};

const StyledMyCoinCard = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  height: 185px;
  width: 300px;
  background-color: white;
  border-radius: 25px;
  padding: 3px;
`;
const StyledCardTitle = styled.div`
  font-size: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const StyledInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StyledProfitRate = styled.div`
  color: ${(props) => {
    let color;
    if (props.rate > 0) {
      color = "#2333c2";
    } else if (props.rate < 0) {
      color = "#C22323";
    } else {
      color = "#B1B1B1";
    }
    return color;
  }};
  font-size: 30px;
  font-weight: 700;
`;
const StyledImageBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  width: 170px;
  overflow: hidden;
  border-radius: 25px;
  padding: 0;
`;

export default MyCoinCard;
