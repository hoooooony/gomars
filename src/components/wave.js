import styled, { keyframes } from "styled-components";

const WaveSVG = (props) => (
  <StyledWaveOverlay rate={props.rate}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      overflow="auto"
      shape-rendering="auto"
      fill="#ffffff"
    >
      <defs>
        <path
          id="wavepath"
          d="M 0 2000 0 500 Q 66 422 132 500 t 132 0 132 0 132 0 132 0 132 0 132 0 132 0 132 0 132 0  v1000 z"
        />
        <path id="motionpath" d="M -264 0 0 0" />
      </defs>
      <g>
        <use xlinkHref="#wavepath" y="119" fill="#29B6F6">
          <animateMotion dur="5s" repeatCount="indefinite">
            <mpath xlinkHref="#motionpath" />
          </animateMotion>
        </use>
      </g>
    </svg>
  </StyledWaveOverlay>
);

const StyledWaveOverlay = styled.div`
  position: absolute;
  top: ${(props) => 180 + props.rate * 100 * 30}px;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.7;
`;

export default WaveSVG;
