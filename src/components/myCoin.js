import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import jsonwebtoken from "jsonwebtoken";
import useCoinListStore from "../store/coinListStore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MyCoinCard from "./myCoinCard";

const MyCoin = () => {
  const { krwMarkets } = useCoinListStore();
  const [myCoins, setMyCoins] = useState([]);

  const getKoreanNameFromMarket = (market) => {
    const marketData = krwMarkets.find((item) => item.market === market);
    return marketData ? marketData.korean_name : "N/A";
  };
  const fetchMyCoins = async () => {
    const access_key = process.env.REACT_APP_UPBIT_OPEN_API_ACCESS_KEY;
    const secret_key = process.env.REACT_APP_UPBIT_OPEN_API_SECRET_KEY;
    if (!secret_key) {
      console.error(
        "UPBIT_OPEN_API_SECRET_KEY가 설정되지 않았거나 접근할 수 없습니다."
      );
      return;
    }
    const payload = {
      access_key: access_key,
      nonce: uuidv4(),
    };

    const token = jsonwebtoken.sign(payload, secret_key);

    const options = {
      method: "GET",
      url: "https://api.upbit.com/v1/accounts",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    };
    try {
      const response = await axios(options);
      const coins = response.data.map((coin) => ({
        ...coin,
        korean_name: getKoreanNameFromMarket(`KRW-${coin.currency}`),
      }));
      setMyCoins(coins);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyCoins();
  }, [krwMarkets]);

  return (
    <StyledMyCoinContainer>
      <StyledMyCoinBox>
        <StyledMyCoinTitle>보유종목</StyledMyCoinTitle>
        <StyledTitleDivide></StyledTitleDivide>
        <div style={{ padding: "0px 8px 8px 8px" }}>
          <Swiper spaceBetween={10} slidesPerView={4}>
            {myCoins
              .filter((item) => item.korean_name !== "N/A")
              .map((coin, index) => (
                <SwiperSlide key={index}>
                  <MyCoinCard
                    market={`KRW-${coin.currency}`}
                    name={coin.korean_name}
                    avg_buy_price={coin.avg_buy_price}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </StyledMyCoinBox>
    </StyledMyCoinContainer>
  );
};

const StyledMyCoinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledMyCoinBox = styled.div`
  position: relative;
  width: 80%;
  height: 239px;
  background-color: #f4f7f8;
`;
const StyledMyCoinTitle = styled.p`
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 25px;
  margin: 5px 0px 2px 2px;
  font-family: "HakgyoansimWoojuR";
`;
const StyledTitleDivide = styled.div`
  width: 100%;
  height: 1px;
  background-color: #b2b1b1;
  margin-top: 30px;
`;
export default MyCoin;
