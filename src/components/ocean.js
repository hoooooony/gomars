import styled, { keyframes } from "styled-components";

const waveAnimation = keyframes`
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
`;

const swellAnimation = keyframes`
  0%, 100% {
    transform: translate3d(0, -25px, 0);
  }
  50% {
    transform: translate3d(0, 5px, 0);
  }
`;

const StyledOcean = styled.div`
  height: 1%;
  width: 100%;
  position: absolute;
  bottom: -50px;
  left: 0;
  background: #015871;
`;

const StyledWave = styled.div`
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg)
    repeat-x;
  position: absolute;
  top: -198px;
  width: 6400px;
  height: 198px;
  animation: ${waveAnimation} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);

  &:nth-of-type(2) {
    top: -175px;
    animation: ${waveAnimation} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
      ${swellAnimation} 7s ease -1.25s infinite;
    opacity: 1;
  }
`;

const WaveComponent = () => (
  <StyledOcean>
    <StyledWave />
    <StyledWave />
  </StyledOcean>
);

export default WaveComponent;
