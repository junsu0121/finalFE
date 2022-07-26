import { useNavigate } from "react-router";
import styled from "styled-components";
import naver from "../src_assets/naver.png";
import kakao from "../src_assets/kakao.png";
import { MailOutlined } from "@ant-design/icons";

export const SignupPick = () => {
  const navigate = useNavigate();

  //카카오
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  //네이버
  const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const NAVER_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${NAVER_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;

  return (
    <>
      <SignupPickContainer>
        <SignupPickWrap>
          <p style={{ fontWeight: "bold", fontSize: "30px" }}>가입하기</p>
          <PickWrap>
            <Pick
              onClick={() => {
                navigate("/signup");
              }}
            >
              <MailOutlined
                style={{ position: "absolute", left: "12%", fontSize: "25px" }}
              />
              <span>이메일로 시작하기</span>
            </Pick>
            <Pick href={KAKAO_AUTH_URL}>
              <LoginIcon src={kakao} alt="kakao" />
              <span>카카오로 시작하기</span>
            </Pick>
            <Pick href={NAVER_AUTH_URL}>
              <LoginIcon src={naver} alt="naver" />
              <span>네이버로 시작하기</span>
            </Pick>
          </PickWrap>

          <LoginLink>
            <span>이미 계정이 있으신가요?</span>
            <LoginLinkInner
              onClick={() => {
                navigate("/");
              }}
            >
              로그인하기
            </LoginLinkInner>
          </LoginLink>
        </SignupPickWrap>
      </SignupPickContainer>
    </>
  );
};

const SignupPickContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;

  @media screen and (min-width: 500px) {
  }
`;

const SignupPickWrap = styled.div`
  height: 100%;
  margin: 20% 5% 0 5%;
`;

const PickWrap = styled.div`
  margin-top: 40%;
`;

const Pick = styled.a`
  height: 50px;
  border: 0.5px solid ${(props) => props.theme.textColor};
  border-radius: 10px;
  margin-bottom: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  span {
    font-weight: bolder;
  }
`;

const LoginIcon = styled.img`
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 100%;
  position: absolute;
  float: left;
  left: 10%;
`;

const LoginLink = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 90%;
  span {
    font-weight: bolder;
    color: #777777;
  }
`;

const LoginLinkInner = styled.div`
  margin-left: 3%;
  font-weight: bolder;
  text-decoration: underline;
`;
