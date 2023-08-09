import { styled } from "styled-components";
import WaveSVG from "./wave";
import useCoinListStore from "../store/coinListStore";
const InterestCoin = ({
  market,
  name,
  trade_price,
  signed_change_rate,
  high,
  low,
}) => {
  const signedChangeRateCal = (signed_change_rate) => {
    const changeRate = signed_change_rate * 100;
    const formattedChangeRate = changeRate.toFixed(2);
    return changeRate > 0 ? `+${formattedChangeRate}` : formattedChangeRate;
  };
  const { removeInterestCoin } = useCoinListStore();
  return (
    <>
      <StyledInterestCoinCard>
        <StyledInfoBox>
          <StyledCardTitle>{name}</StyledCardTitle>
          <div>시장가: {trade_price}₩</div>
          <StyledChangeRate rate={signed_change_rate}>
            {signedChangeRateCal(signed_change_rate)}%
          </StyledChangeRate>
          <div>52주 신고가: </div>
          <StyledNewRecord color="#2333c2">{high}</StyledNewRecord>
          <div>52주 신저가: </div>
          <StyledNewRecord color="#C22323">{low}</StyledNewRecord>
        </StyledInfoBox>
        <StyledImageBox>
          {signed_change_rate < 0 ? (
            <img
              style={{ width: "80px", height: "80px" }}
              src="image/dogeCoin.png"
            />
          ) : (
            <img
              style={{ width: "90px", height: "90px" }}
              src="image/dogerocket.png"
            />
          )}
          {signed_change_rate < 0 && <WaveSVG rate={signed_change_rate} />}
        </StyledImageBox>
        <StyledDeleteButton onClick={() => removeInterestCoin(market)}>
          <img
            style={{ width: "25px", height: "25px" }}
            src="image/trashcan.png"
          ></img>
        </StyledDeleteButton>
      </StyledInterestCoinCard>
    </>
  );
};

const StyledInterestCoinCard = styled.div`
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
const StyledChangeRate = styled.div`
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
const StyledInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const StyledDeleteButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  top: 0;
  right: -1px;
  cursor: pointer;
`;
const StyledNewRecord = styled.p`
  color: ${(props) => props.color};
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`;

export default InterestCoin;
