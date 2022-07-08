import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atmoms";
import Logo from "../src_assets/Logo.png";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const Start = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const navigate = useNavigate();
  //darkmode check
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  //darkmode check
  return (
    <>
      {/* darkmode check */}
      <button onClick={toggleDarkAtom}>Toggle Mode</button>
      {/* darkmode check */}
      <StartContainer>
        <StartWrap>
          <LogoImg src={Logo} alt="Logo" />
          <LoginBtn
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </LoginBtn>
          <SignupBtn
            onClick={() => {
              navigate("/signuppick");
            }}
          >
            새로 시작하기
          </SignupBtn>
        </StartWrap>
      </StartContainer>
    </>
  );
};

const StartContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;

  @media screen and (min-width: 500px) {
  }
`;

const StartWrap = styled.div`
  height: 100%;
  margin: 20% 5% 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  margin-top: 15%;
  height: 30%;
  width: 80%;
`;

const LoginBtn = styled.button`
  margin: 90% 0 5% 0;
  height: 50px;
  width: 80%;
  border: none;
  border-radius: 10px;
  background-color: #777777;
  color: #252525;
  font-weight: bold;
  font-size: 15px;
`;

const SignupBtn = styled.button`
  margin: 5% 0 5% 0;
  height: 50px;
  width: 80%;
  border: 1px solid #777777;
  border-radius: 10px;
  background-color: transparent;
  color: #777777;
  font-weight: bold;
  font-size: 15px;
`;
