import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atmoms";
import { Outlet, useMatch, useNavigate } from "react-router";
import { Link } from "react-router-dom";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const Bar = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const navigate = useNavigate();
  const barListMatch = useMatch("/barlist");
  const barMyListMatch = useMatch("/barmylist");

  return (
    <>
      <BarContainer>
        <BarWrap>
          <p style={{ fontWeight: "bold", fontSize: "30px" }}>Store</p>
          <BarCategoryWrap>
            <BarCategoryTab isActive={barListMatch !== null}>
              <Link to={"/bar/barlist"}>탐색</Link>
            </BarCategoryTab>
            <BarCategoryTab isActive={barMyListMatch !== null}>
              <Link to={"/bar/barmylist"}>MY</Link>
            </BarCategoryTab>
          </BarCategoryWrap>
          {/* 부모 컴포넌트안에 <Outlet/>으로 원하는 자손 컴포넌트 위치를 정한다. 그리고 context prop으로 자손 컴포넌트에게에게 넘기고 싶은 값을 넣는다. */}
          <Outlet />
        </BarWrap>
      </BarContainer>
    </>
  );
};

const BarContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;

  @media screen and (min-width: 500px) {
  }
`;

const BarWrap = styled.div`
  height: 100%;
  margin: 20% 5% 0 5%;
`;

const BarCategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 10% 0% 10% 0%;
`;

const BarCategoryTab = styled.span<{ isActive: boolean }>`
  justify-content: center;
  align-items: center;
  font-size: 18px;
  :hover {
    text-decoration: underline;
    text-underline-position: under;
  }
  a {
    font-weight: bold;
    text-decoration: none;
    color: inherit;
  }
`;
