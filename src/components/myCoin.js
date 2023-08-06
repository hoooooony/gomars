import { useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import jsonwebtoken from "jsonwebtoken";
const MyCoin = () => {
  useEffect(() => {
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

    console.log(payload);
    const token = jsonwebtoken.sign(payload, secret_key);
    console.log(token);
    const options = {
      method: "GET",
      url: "https://api.upbit.com/v1/accounts",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    };

    axios(options)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <StyledMyCoinContainer>
        <StyledMyCoinBox></StyledMyCoinBox>
      </StyledMyCoinContainer>
    </>
  );
};

const StyledMyCoinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledMyCoinBox = styled.div`
  width: 80%;
  height: 239px;
  background-color: #f4f7f8;
`;

export default MyCoin;
