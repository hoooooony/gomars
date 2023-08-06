import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import useCoinListStore from "../store/coinListStore";
import { Tooltip } from "react-tooltip";
import { getMarketApi, getMarketDetailApi } from "../api/getmarketapi";

function CoinList() {
  const {
    krwMarkets,
    krwMarketDetail,
    interestCoin,
    setKrwMarkets,
    setKrwMarketDetail,
    addInterestCoin,
    removeInterestCoin,
  } = useCoinListStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [upDownState, setUpDownState] = useState("🔽");
  const itemsPerPage = 10;
  const totalItems = krwMarketDetail.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const fetchMarkets = async () => {
    try {
      const data = await getMarketApi();
      if (data) {
        setKrwMarkets(data.filter((item) => item.market.startsWith("KRW-")));
      }
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };

  const fetchMarketDetails = async (markets) => {
    try {
      const data = await getMarketDetailApi(markets);
      if (data) {
        sortBySignedChangeRate(data);
      }
    } catch (error) {
      console.error("Error fetching market details:", error);
    }
  };

  useEffect(() => {
    fetchMarkets();
    const intervalId = setInterval(fetchMarkets, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (krwMarkets.length > 0) {
      const marketList = krwMarkets.map((item) => item.market);
      fetchMarketDetails(marketList);
    }
  }, [krwMarkets, upDownState]);

  const getKoreanNameFromMarket = (market) => {
    const marketData = krwMarkets.find((item) => item.market === market);
    return marketData ? marketData.korean_name : "N/A";
  };

  const signedChangeRateCal = (signed_change_rate) => {
    const changeRate = signed_change_rate * 100;
    const formattedChangeRate = changeRate.toFixed(2);
    return changeRate > 0 ? `+${formattedChangeRate}` : formattedChangeRate;
  };

  const sortBySignedChangeRate = (data) => {
    if (upDownState === "🔼") {
      const sortedBySignedChangeRate = data.sort(
        (a, b) => a.signed_change_rate - b.signed_change_rate
      );
      setKrwMarketDetail([...sortedBySignedChangeRate]);
    } else if (upDownState === "🔽") {
      const sortedBySignedChangeRate = data.sort(
        (a, b) => b.signed_change_rate - a.signed_change_rate
      );
      setKrwMarketDetail([...sortedBySignedChangeRate]);
    }
  };
  const changeSort = () => {
    if (upDownState === "🔽") {
      setUpDownState("🔼");
    } else if (upDownState === "🔼") {
      setUpDownState("🔽");
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return krwMarketDetail.slice(startIndex, endIndex).map((item, index) => (
      <tr key={index}>
        <td>{startIndex + index + 1}</td>
        <StyledTd
          data-tooltip-id="my-tooltip"
          data-tooltip-content={`이름: ${getKoreanNameFromMarket(
            item.market
          )},가격: ${item.trade_price}, 변화율: ${item.signed_change_rate}`}
        >
          {getKoreanNameFromMarket(item.market)}
        </StyledTd>
        <td>{item.trade_price.toLocaleString()}₩</td>
        <StyledTd>
          <StyledChangeRate rate={item.signed_change_rate}>
            {signedChangeRateCal(item.signed_change_rate)}%
          </StyledChangeRate>
        </StyledTd>
        <td>
          {interestCoin.includes(item.market) ? (
            <StyledDeleteButton onClick={() => removeInterestCoin(item.market)}>
              삭제
            </StyledDeleteButton>
          ) : (
            <StyledAddButton onClick={() => addInterestCoin(item.market)}>
              등록
            </StyledAddButton>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <>
      <StyledListContainer>
        <StyledListBox>
          <StyledTableDiv>
            <table>
              <StyledThead>
                <tr>
                  <th>순번</th>
                  <th style={{ width: "100px" }}>이름</th>
                  <th style={{ width: "80px" }}>가격</th>
                  <StyledTh>
                    등락율
                    <StyledUpDownButton onClick={changeSort}>
                      {upDownState}
                    </StyledUpDownButton>
                  </StyledTh>
                  <th>관심종목</th>
                </tr>
              </StyledThead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </StyledTableDiv>
          <StyledButtonContainer>
            <StyledButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </StyledButton>
            <span>{currentPage}</span>
            <StyledButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </StyledButton>
          </StyledButtonContainer>
        </StyledListBox>
      </StyledListContainer>
      <Tooltip id="my-tooltip" place="right" type="dark" effect="float" />
    </>
  );
}

const StyledListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const StyledListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  box-shadow: rgba(46, 87, 168, 0.1) 0px 5px 10px;
  table {
    border-collapse: collapse;
    border-radius: 24px;
  }
`;
const StyledButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;
const StyledButton = styled.button`
  border: 0;
`;
const StyledUpDownButton = styled.button`
  border: 0;
  background-color: #d9d9d9;
`;
const StyledChangeRate = styled.div`
  border: 0;
  background-color: ${(props) => {
    let backgroundColor;
    if (props.rate > 0) {
      backgroundColor = "#2333c2";
    } else if (props.rate < 0) {
      backgroundColor = "#C22323";
    } else {
      backgroundColor = "#B1B1B1";
    }
    return backgroundColor;
  }};
  width: 66px;
  height: 25px;
  border-radius: 15px;
  color: white;
  margin: 0 auto;
`;
const StyledThead = styled.thead`
  background-color: #d9d9d9;
  th {
    padding: 10px 15px;
  }
`;
const StyledAddButton = styled.button`
  border: 0px;
  background-color: #3ddf74;
  width: 66px;
  height: 25px;
  border-radius: 15px;
  color: white;
`;
const StyledDeleteButton = styled.button`
  border: 0px;
  background-color: #b3bdb6;
  width: 66px;
  height: 25px;
  border-radius: 15px;
  color: white;
`;
const StyledTableDiv = styled.div`
  border-radius: 15px;
  overflow: hidden;
`;

const StyledTd = styled.td`
  text-align: center;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 2px;
`;
const StyledTh = styled.th`
  display: flex;
  align-items: center;
`;
export default CoinList;
