import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { instance } from "../shared/axios";
import { setCookie } from "../shared/cookie";

//이건 프론트에서 인가코드 받을때 방식
export const KakaoRedirect = () => {
  const navigate = useNavigate();
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code");
  console.log(code);

  useEffect(() => {
    async function kakaoLogin() {
      await instance
        // .get(`/oauth/kakao/callback?code=${code}`)
        .get(`/api/user/kakao/callback?code=${code}`)
        // .get(`/api/user/kakao/callback`)
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
          // navigate("/main");
          window.location.reload();
        })

        .catch((error) => {
          window.alert(error);
        });
    }
    kakaoLogin();
  }, []);

  return <div>잠시만 기다려주세요!</div>;
};
