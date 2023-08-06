import { styled } from "styled-components";

const InterestCoin = ({ name, trade_price, signed_change_rate, high, low }) => {
  const signedChangeRateCal = (signed_change_rate) => {
    const changeRate = signed_change_rate * 100;
    const formattedChangeRate = changeRate.toFixed(2);
    return changeRate > 0 ? `+${formattedChangeRate}` : formattedChangeRate;
  };
  return (
    <>
      <StyledInterestCoinCard>
        <StyledInfoBox>
          <StyledCardTitle>{name}</StyledCardTitle>
          <div>시장가: {trade_price}₩</div>
          <StyledChangeRate rate={signed_change_rate}>
            {signedChangeRateCal(signed_change_rate)}%
          </StyledChangeRate>
          <div>52주 신고가: {high}</div>
          <div>52주 신저가: {low}</div>
        </StyledInfoBox>
        <StyledImageBox>
          <img
            style={{ width: "80px", height: "80px" }}
            src="image/dogeCoin.png"
          />
          {signed_change_rate < 0 && <WaveOverlay rate={signed_change_rate} />}
        </StyledImageBox>
      </StyledInterestCoinCard>
    </>
  );
};

const StyledInterestCoinCard = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  height: 180px;
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
const WaveOverlay = styled.div`
  position: absolute;
  top: ${(props) => 180 + props.rate * 100 * 20}px;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 220, 0.9);
`;

const StyledImageBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default InterestCoin;
