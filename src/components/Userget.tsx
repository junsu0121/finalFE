import React, { useEffect } from "react";
import { setCookie } from "../shared/cookie";
import { instance } from "../shared/axios";
import styled from "styled-components";
import Img from "../src_assets/loading.png";

//이건 프론트에서 인가코드 받을때 방식
export const Userget = () => {
  // const navigate = useNavigate();
  // let params = new URL(window.location.href).searchParams;
  // let code = params.get("code");
  // console.log(code);

  // window.location.reload();

  useEffect(() => {
    console.log("실행되나?");
    async function userGet() {
      // const token = new URL(window.location.href).searchParams.get("token");

      //   const token = getCookie("token");

      await instance
        // .get("/api/user/kakao/callback")
        .get("/api/user/me")
        .then((response) => {
          console.log(response);
          setCookie("nickname", response.data.nickName, {
            path: "/",
          });
          setCookie("userId", response.data.userId, {
            path: "/",
          });
          window.location.replace("/main");
        })
        .catch((error) => {
          window.alert("알 수 없는 오류로 로그인에 실패하였습니다.");
          window.location.replace("/");
        });
    }
    userGet();
  }, []);

  // useEffect(() => {
  //   // 토큰 get
  //   const token = new URL(window.location.href).searchParams.get("token");
  //   console.log(token);
  //   setCookie("token", token);

  //   //id get
  //   const email = new URL(window.location.href).searchParams.get("email");
  //   console.log(email);
  //   setCookie("email", email);

  //   //닉네임 get
  //   const nickname = new URL(window.location.href).searchParams.get("nickname");
  //   const decodeName = decodeURI(decodeURIComponent(nickname));
  //   console.log(decodeName, "닉네임");
  //   setCookie("nickname", decodeName);

  //   //메인으로 보내기
  //   window.location.replace("/main");
  // }, []);

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
