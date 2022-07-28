import React, { useEffect } from "react";
import { instance } from "../shared/axios";
import { setCookie } from "../shared/cookie";

export const GoogleRedirect = () => {
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code");

  useEffect(() => {
    async function googleLogin() {
      await instance
        // .get(`/oauth/google/callback?code=${code}`)
        .get(`/api/user/google/callback?code=${code}`)
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
    googleLogin();
  }, []);

  return <div>잠시만 기다려주세요!</div>;
};
