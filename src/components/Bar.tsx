import styled from "styled-components";
import { Outlet, useMatch } from "react-router";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import { getCookie } from "../shared/cookie";
import { useEffect } from "react";

export const Bar = () => {
  const barListMatch = useMatch("/barlist");
  const barMyListMatch = useMatch("/barmylist");
  const userId = getCookie("userId");
  useEffect(() => {
    document.getElementById("barListBtn").focus();
  }, []);
  return (
    <>
      <BarContainer>
        <BarWrap>
          <p style={{ fontWeight: "bold", fontSize: "28px" }}>Store</p>
          <BarCategoryWrap>
            <Link to={"/bar/barlist"}>
              <button id="barListBtn" className="button">
                <BarCategoryTab isActive={barListMatch !== null}>
                  탐색
                </BarCategoryTab>
              </button>
            </Link>
            <Link to={`/bar/barmylist/${userId}`}>
              <button className="button">
                <BarCategoryTab isActive={barMyListMatch !== null}>
                  MY
                </BarCategoryTab>
              </button>
            </Link>
          </BarCategoryWrap>
          <Line />
          {/* 부모 컴포넌트안에 <Outlet/>으로 원하는 자손 컴포넌트 위치를 정한다. 그리고 context prop으로 자손 컴포넌트에게에게 넘기고 싶은 값을 넣는다. */}
          <Outlet />
        </BarWrap>
        <Footer />
      </BarContainer>
    </>
  );
};

const BarContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media screen and (min-width: 500px) {
  }
`;

const BarWrap = styled.div`
  height: 100%;
  margin: 15% 5% 0 5%;
`;

const BarCategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 10% 0% 10% 0%;
  button.button {
    cursor: pointer;
    height: 40px;
    width: 130px;
    border-radius: 100rem;
    padding: 1rem;
    font-size: 1rem;
    padding: 0.5rem 3rem;
    box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
    border: none;
    color: white;
    background-image: linear-gradient(to right, #3bbaff, #ab26ff, #fa0671),
      linear-gradient(101deg, #36c3ff, #ab26ff, #fa0671);
    background-origin: border-box;
    background-clip: border-box;
    box-shadow: 2px 1000px 1px #363c52 inset;
  }

  button.button:hover {
    box-shadow: none;
    color: white;
  }
  button.button:focus {
    box-shadow: none;
    color: white;
  }
`;

const BarCategoryTab = styled.div<{ isActive: boolean }>`
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  a {
    font-weight: bold;
    text-decoration: none;
    color: inherit;
  }
`;
const Line = styled.hr`
  width: 95%;
  height: 0.1%;
  border: none;
  background-color: #353535;
  margin-bottom: 10%;
`;
