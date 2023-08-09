import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useCoinListStore from "../store/coinListStore";
import InterestCoinCard from "./interestCoinCard";
const InterestCoin = () => {
  const { krwMarkets, krwMarketDetail, interestCoin } = useCoinListStore();

  return (
    <StyledInterestCoinCotainer>
      <StyledInterestCoinBox>
        <StyledInterestTitle>관심종목</StyledInterestTitle>
        <StyledTitleDivide></StyledTitleDivide>
        <div style={{ padding: "0px 8px 8px 8px" }}>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {interestCoin.map((market, index) => {
              const marketDetail = krwMarketDetail.find(
                (item) => item.market === market
              );
              const marketKoreanName = krwMarkets.find(
                (item) => item.market === market
              );
              return (
                <SwiperSlide key={index}>
                  <InterestCoinCard
                    market={market}
                    name={marketKoreanName?.korean_name}
                    trade_price={marketDetail?.trade_price}
                    signed_change_rate={marketDetail?.signed_change_rate}
                    high={marketDetail?.highest_52_week_price}
                    low={marketDetail?.lowest_52_week_price}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </StyledInterestCoinBox>
    </StyledInterestCoinCotainer>
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

export default InterestCoin;
