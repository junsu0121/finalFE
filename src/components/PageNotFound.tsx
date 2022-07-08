import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atmoms";
import Img from "../src_assets/loading.png";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const PageNotFound = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const navigate = useNavigate();
  return (
    <>
      <PageNotFoundContainer>
        <PageNotFoundWrap>
          <img src={Img} alt="loading" />
          <Txt>해당 페이지를 찾을 수 없습니다.</Txt>
          <Home
            onClick={() => {
              navigate("/main");
            }}
          >
            홈으로 이동
          </Home>
        </PageNotFoundWrap>
      </PageNotFoundContainer>
    </>
  );
};

const PageNotFoundContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;

  @media screen and (min-width: 500px) {
  }
`;

const PageNotFoundWrap = styled.div`
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
