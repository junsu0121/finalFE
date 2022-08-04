import React, { useEffect } from "react";
import { setCookie } from "../shared/cookie";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Img from "../src_assets/loading.png";

//이건 프론트에서 인가코드 받을때 방식
export const Oauth = () => {
  const { token } = useParams();

  useEffect(() => {
    async function oauthLogin() {
      // 토큰 get
      const realToken = token.slice(6);
      setCookie("token", realToken, {
        path: "/",
      });

      window.location.replace("/oauth/userget");
    }
    oauthLogin();
  }, []);

  return (
    <>
      <SocialLoaginContainer>
        <SocialLoaginWrap>
          <img src={Img} alt="loading" />
          <Txt>로그인 중입니다. 잠시만 기다려주세요!</Txt>
          <Home>Btender</Home>
        </SocialLoaginWrap>
      </SocialLoaginContainer>
    </>
  );
};
const SocialLoaginContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;

  @media screen and (min-width: 500px) {
  }
`;

const SocialLoaginWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    font-weight: bolder;
  }
`;

const Txt = styled.div`
  margin-top: 20%;
`;

const Home = styled.div`
  margin-top: 10%;
  text-decoration: underline;
`;
