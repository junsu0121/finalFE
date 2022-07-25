import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, isLoginState } from "../atmoms";
import { useForm } from "react-hook-form";
import google from "../src_assets/google.png";
import kakao from "../src_assets/kakao.png";
import { useNavigate } from "react-router";
import { instance } from "../shared/axios";
import { getCookie, setCookie } from "../shared/cookie";
import axios from "axios";
import { useEffect, useState } from "react";

interface IFormData {
  email: string;
  password: string;
}
//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?

export const Login = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const navigate = useNavigate();

  //카카오
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  //구글
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<IFormData>();

  //react-hook-form 비밀번호 활성활 비활성화
  const [isActive, setIsActive] = useState(false);
  const watchAll = Object.values(watch());
  useEffect(() => {
    if (watchAll.every((el) => el)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [watchAll]);

  const onValid = async (data: IFormData) => {
    // await axios
    await axios
      .post("https://www.btenderapi.com/api/user/login", data)
      // .post("/user/login", users)
      //성공시 리스폰스 받아옴
      .then((response) => {
        const accessToken = response.data.token;
        const nickname = response.data.nickname;
        const userId = response.data._id;
        //서버에서 받은 토큰 저장
        setCookie("token", accessToken);
        setCookie("nickname", nickname);
        setCookie("userId", userId);
        // 저장된 토큰으로 login 여부 확인 recoil로
        if (accessToken) {
          setIsLogin(true);
          const token = getCookie("token");
          instance.defaults.headers.common["Authorization"] = token
            ? `Bearer ${token}`
            : null;
          //test
          // navigate("/mypage/1");
          navigate("/main");
        } else if (response.data.msg === "1") {
          window.alert("가입되지 않은 이메일입니다.");
        } else if (response.data.msg === "2") {
          window.alert("비밀번호가 틀립니다.");
        }
      })
      //실패시 에러메시지 받아옴, 작성한 벨리데이션 문구도 같이
      .catch(function (error) {
        console.log(error);
        window.alert("서버가 아파요! 잠시만 기다려주세요!");
      });
  };

  return (
    <>
      <LoginContainer>
        <LoginWrap>
          <p style={{ fontWeight: "bold", fontSize: "30px" }}>로그인</p>

          <LoginForm onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("email", {
                required: "이메일을 입력하세요!",
                pattern: {
                  value:
                    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                  message: "이메일 형식으로 입력하세요!",
                },
              })}
              id="email"
              type="email"
              placeholder="이메일 입력"
            ></Input>
            <ErrorMsg>{errors?.email?.message}</ErrorMsg>
            <Input
              {...register("password", {
                required: "비밀번호를 입력하세요!",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{3,10}$/,
                  message: "비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로",
                },
              })}
              id="password"
              type="password"
              placeholder="비밀번호 입력"
            ></Input>
            <ErrorMsg>{errors?.password?.message}</ErrorMsg>
            <LoginBtn disabled={!isActive}>로그인</LoginBtn>
          </LoginForm>

          <FindWrap>
            <span>계정 찾기</span>
            <span>비밀번호 찾기</span>
          </FindWrap>

          <HrWrap>
            <Bar />
            <HrTxt>또는</HrTxt>
            <Bar />
          </HrWrap>

          <OauthWrap>
            <a href={KAKAO_AUTH_URL}>
              <LoginIcon src={kakao} alt="kakao" />
            </a>
            <a href={GOOGLE_AUTH_URL}>
              <LoginIcon src={google} alt="google" />
            </a>
          </OauthWrap>
          <SignupLink>
            <span>아직 Btender의 회원이 아니신가요?</span>
            <SignupLinkInner
              onClick={() => {
                navigate("/signuppick");
              }}
            >
              회원가입
            </SignupLinkInner>
          </SignupLink>
        </LoginWrap>
      </LoginContainer>
    </>
  );
};

const LoginContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;

  @media screen and (min-width: 500px) {
  }
`;

const LoginWrap = styled.div`
  height: 100%;
  margin: 20% 5% 0 5%;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10% 0 10% 0;
`;
// color: ${(props) => props.theme.textColor};
const Input = styled.input`
  padding: 0 0 5% 0;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  font-size: 15px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
const ErrorMsg = styled.span`
  margin: 3% 0 5% 0;
  /* font-weight: bolder; */
`;

const LoginBtn = styled.button`
  margin: 5% 0 5% 0;
  height: 50px;
  border: none;
  border-radius: 10px;
  background: ${(props) =>
    props.disabled
      ? "#777777"
      : "linear-gradient(to left, #fa0671, #a62dff, #37bfff)"};
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

const FindWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  span {
    font-weight: bolder;
    color: #777777;
  }
`;

const HrWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10%;
`;

const Bar = styled.hr`
  flex: auto;
  border: none;
  height: 1px;
  background-color: #777777;
`;

const HrTxt = styled.span`
  color: #777777;
  font-weight: bolder;
  padding: 0 10px;
`;

const OauthWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 10%;
`;

const LoginIcon = styled.img`
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 100%;
  height: 40px;
`;

const SignupLink = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 60%;
  span {
    font-weight: bolder;
    color: #777777;
  }
`;

const SignupLinkInner = styled.div`
  margin-left: 3%;
  font-weight: bolder;
  text-decoration: underline;
`;
