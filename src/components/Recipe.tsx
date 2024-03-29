import styled from "styled-components";
import { Link, useMatch, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";

interface ILocation {
  state: {
    name: string;
  };
}

export const Recipe = () => {
  const { state } = useLocation() as ILocation;
  const recipeSearch = useMatch("/recipe/search");
  const recipeMylist = useMatch("/recipe/my");

  useEffect(() => {
    document.getElementById("barListBtn").focus();
  }, []);
  return (
    <>
      <Cointainer>
        <Title>
          <p style={{ fontWeight: "bold", fontSize: "28px" }}>Recipe</p>
        </Title>
        <div>
          <BarCategoryWrap>
            <Link to={"/recipe/search"}>
              <button id="barListBtn" className="button">
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
        <Div></Div>
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
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

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
  padding-top: 5%;
`;

const BarCategoryTab = styled.span<{ isActive: boolean }>`
  /* border: 1px solid white; */
  /* width: 60px; */
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
const Div = styled.div`
  height: 100px;
  width: 100%;
`;
