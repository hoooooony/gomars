import { styled } from "styled-components";
import HangangTemp from "./hangangtemp";

const Header = () => {
  return (
    <>
      <StyledHeader>
        <TempArea></TempArea>
        <img
          style={({ width: "170px" }, { height: "170px" })}
          src="image/dogeCoin.png"
        />
        <HangangTemp></HangangTemp>
      </StyledHeader>
    </>
  );
};
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TempArea = styled.div`
  width: 200px;
  height: 150px;
`;
export default Header;
