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
          <Tabs>
            <Tab isActive={recipeSearch !== null}>
              <Link to={`/recipe/search`}>탐색</Link>
            </Tab>
            <Tab isActive={recipeMylist !== null}>
              <Link to={`/recipe/my`}>My</Link>
            </Tab>
          </Tabs>
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
  border: 3px solid
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
