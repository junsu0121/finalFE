import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atmoms";
import google from "../src_assets/google.png";
import kakao from "../src_assets/kakao.png";
import { MailOutlined } from "@ant-design/icons";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const SignupPick = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const navigate = useNavigate();
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

            <Pick>
              <LoginIcon src={kakao} alt="kakao" />
              <span>카카오로 시작하기</span>
            </Pick>
            <Pick>
              <LoginIcon src={google} alt="google" />
              <span>구글로 시작하기</span>
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

const Pick = styled.div`
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
