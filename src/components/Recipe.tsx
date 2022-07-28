import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";

import { Link, useMatch, useLocation, Outlet } from "react-router-dom";

interface ILocation {
  state: {
    name: string;
  };
}
//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const Recipe = () => {
  const { state } = useLocation() as ILocation;
  const recipeSearch = useMatch("/recipe/search");
  const recipeMylist = useMatch("/recipe/my");
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <Cointainer>
        <Title>Recipe</Title>
        <div>
          <BarCategoryWrap>
            <Link to={"/recipe/search"}>
              <button className="button">
                <BarCategoryTab isActive={recipeSearch !== null}>
                  탐색
                </BarCategoryTab>
              </button>
            </Link>
            <Link to={`/recipe/my`}>
              <button className="button">
                <BarCategoryTab isActive={recipeMylist !== null}>
                  MY
                </BarCategoryTab>
              </button>
            </Link>
          </BarCategoryWrap>
          <Outlet />
        </div>
      </Cointainer>
    </>
  );
};

const Cointainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  text-align: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  margin: 5% 0px 0px 0px;
  padding-left: 3%;
`;

const Tab = styled.div<{ isActive: boolean }>`
  width: 70%;
  height: 50%;
  margin: auto;
  text-align: center;
  text-transform: uppercase;
  font-size: 17px;
  font-weight: 400;
  background-color: "#323232";
  padding: 7px 0px;
  border: 3px solid transparent
    ${(props) =>
      props.isActive ? props.theme.hoverColor : props.theme.cardBgColor};
  border-radius: 20px;
  color: ${(props) =>
    props.isActive
      ? props.theme.toggleTextTrueColor
      : props.theme.toggleTextFalseColor};
  a {
    display: block;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

// color: ${(props) =>
//   props.isActive ? props.theme.textColor : props.theme.bgColor};

const BarCategoryTab = styled.span<{ isActive: boolean }>`
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  a {
    font-weight: bold;
    text-decoration: none;
    color: inherit;
  }
`;

const BarCategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 10% 0% 10% 0%;
  button.button {
    border-radius: 100rem;
    padding: 1rem;
    font-size: 1rem;
    padding: 0.5rem 3rem;
    box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
    border: solid 3px transparent;
    color: white;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0)
      ),
      linear-gradient(101deg, #36c3ff, #e232ff);
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-shadow: 2px 1000px 1px #363c52 inset;
  }

  button.button:hover {
    box-shadow: none;
    color: white;
  }
`;
