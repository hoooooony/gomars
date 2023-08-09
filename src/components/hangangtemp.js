import { useEffect, useState } from "react";
import { getHangangTempApi } from "../api/gethangangtemp";
import WaveComponent from "./ocean";
import { styled } from "styled-components";
import { kadvice } from "kadvice";
import { Tooltip } from "react-tooltip";
import "./advice.css";
const HangangTemp = () => {
  const [hangangTemp, setHangangTemp] = useState({ temp: "Loading..." });
  const [advice, setAdvice] = useState("");
  const fetchHangangTemp = () => {
    getHangangTempApi().then((data) => {
      if (data) {
        setHangangTemp(data);
        console.log(data.temp);
      }
    });
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchHangangTemp();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    setAdvice(kadvice.getOne());
  }, [hangangTemp]);
  return (
    <>
      <StyledHangang
        data-tooltip-id="advice-tooltip"
        data-tooltip-content={`${advice.message}`}
      >
        <TempText>한강: {hangangTemp.temp}°C</TempText>
        <WaveComponent></WaveComponent>
      </StyledHangang>
      <Tooltip
        id="advice-tooltip"
        place="left"
        type="dark"
        effect="float"
        offset={5}
        className={"tooltip"}
      />
    </>
  );
};

const StyledHangang = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(179, 213, 225, 0.4);
  margin-right: 20px;
  border-radius: 10px;
`;
const TempText = styled.div`
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  color: white;
  z-index: 2;
`;
export default HangangTemp;
