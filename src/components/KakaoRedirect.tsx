import React, { useEffect } from "react";
import { setCookie } from "../shared/cookie";
import { instance } from "../shared/axios";

//이건 프론트에서 인가코드 받을때 방식
export const KakaoRedirect = () => {
  // const navigate = useNavigate();
  // let params = new URL(window.location.href).searchParams;
  // let code = params.get("code");
  // console.log(code);

  useEffect(() => {
    console.log("실행되나?");
    async function kakaoLogin() {
      // 토큰 get
      const token = new URL(window.location.href).searchParams.get("token");
      console.log(token);
      setCookie("token", token);

      await instance
        // .get("/api/user/kakao/callback")
        .get("/api/user/me")
        .then((response) => {
          console.log(response);
          setCookie("nickname", response.data.nickname);
          setCookie("userId", response.data._id);
          // localStorage.setItem("token", response.data.token);
          // localStorage.setItem("email", response.data.email);
          // localStorage.setItem("nickname", response.data.nickname);
          // localStorage.setItem("profile", response.data.profile);
          window.location.replace("/main");
          // window.location.reload();
        })
        .catch((error) => {
          window.alert("알 수 없는 오류로 로그인에 실패하였습니다.");
          window.location.replace("/");
        });
    }
    kakaoLogin();
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

  return <div>잠시만 기다려주세요!</div>;
};
