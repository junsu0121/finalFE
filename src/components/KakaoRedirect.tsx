import React, { useEffect } from "react";
import { instance } from "../shared/axios";
import { setCookie } from "../shared/cookie";

export const KakaoRedirect = () => {
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code");

  useEffect(() => {
    async function kakaoLogin() {
      await instance
        // .get(`/oauth/kakao/callback?code=${code}`)
        .get(`/api/user/kakao/callback?code=${code}`)
        .then((response) => {
          console.log(response);
          setCookie("token", response.data.token);
          setCookie("email", response.data.email);
          setCookie("nickname", response.data.nickname);
          setCookie("profile", response.data.profile);
          // localStorage.setItem("token", response.data.token);
          // localStorage.setItem("email", response.data.email);
          // localStorage.setItem("nickname", response.data.nickname);
          // localStorage.setItem("profile", response.data.profile);
        })
        .catch((error) => {
          window.alert(error);
        });
    }
    kakaoLogin();
  }, []);

  return <div>잠시만 기다려주세요!</div>;
};
