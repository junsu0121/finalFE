import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const Main = () => {
  const navigate = useNavigate();
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <>
      <AllList>
        <button onClick={toggleDarkAtom}>dark Mode</button>
        <LOGO>로고가 들어갈 자리</LOGO>
        <MyList>
          <ListCard>
            <Head>닉네임</Head>
          </ListCard>
          <PlusCard
            onClick={() => {
              navigate("/alcoholLibrary");
            }}
          >
            <p style={{ width: "100%", textAlign: "center" }}>
              <PlusOutlined />
            </p>
          </PlusCard>
        </MyList>
        <CocktailTitle>추천 칵테일</CocktailTitle>
        <CocktailList>
          <CocktailCard></CocktailCard>
        </CocktailList>

        <RecipeTitle>레시피</RecipeTitle>
        <div style={{ position: "relative" }}>
          <RecipeElse
            onClick={() => {
              navigate("/recipe");
            }}
          >
            더보기
          </RecipeElse>
        </div>
        <RecipeList>
          <RecipeCard></RecipeCard>
        </RecipeList>
      </AllList>
    </>
  );
};

const AllList = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  text-align: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const LOGO = styled.div`
  text-align: center;
  margin: 5%;
`;

const MyList = styled.div`
  background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.bggrColor},
    ${(props) => props.theme.bgColor}
  );
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: auto;
  width: 70%;
  height: 300px;
  border: solid 1px ${(props) => props.theme.bgColor};
  border-radius: 5px;
`;
const ListCard = styled.div`
  width: 80%;
  height: 35%;
  margin: 20px auto;
  /* border: 1px solid; */
  border-radius: 10px;
  align-items: center;
  /* padding: 10px; */
  background-color: #ffffff;
  color: black;
`;

const PlusCard = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  width: 80%;
  height: 35%;
  margin: 20px auto;

  /* border: 1px solid; */
  border-radius: 10px;

  /* padding: 10px; */
  background-color: ${(props) => props.theme.plusColor};
  color: #534e4e;
  cursor: pointer;

  :hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 5px 15px 0px;
  }
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
`;

const CocktailTitle = styled.h1`
  font-weight: bold;
  font-size: 20px;
  float: left;
  margin: 5% 0px 0px 0px;
  padding-left: 3%;
`;

const CocktailList = styled.div`
  /* background-color: red; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: auto;
  width: 100%;
  height: 100px;
  border: solid 1px ${(props) => props.theme.bgColor};
  border-radius: 5px;
`;

const CocktailCard = styled.div`
  width: 60%;
  height: 80%;
  margin: auto;
  /* border: 1px solid ${(props) => props.theme.bggrColor}; */
  border-radius: 10px;
  align-items: center;
  /* padding: 10px; */
  background-color: ${(props) => props.theme.recipebgColor};
  color: black;
  cursor: pointer;

  :hover {
    box-shadow: ${(props) => props.theme.hoverColor} 0px 5px 15px 0px;
  }
`;
const RecipeTitle = styled.h1`
  font-weight: bold;
  font-size: 20px;
  float: left;
  margin: 5% 0px 0px 0px;
  padding-left: 3%;
`;

const RecipeList = styled.div`
  /* background-color: red; */
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  margin: auto;
  width: 100%;
  height: 100px;
  border: solid 1px ${(props) => props.theme.bgColor};
  border-radius: 5px;
`;
const RecipeCard = styled.div`
  width: 85%;
  height: 80%;
  margin: auto;
  /* border: 1px solid ${(props) => props.theme.bggrColor}; */
  border-radius: 10px;
  align-items: center;
  /* padding: 10px; */
  background-color: ${(props) => props.theme.recipebgColor};
  color: black;
  cursor: pointer;

  :hover {
    box-shadow: ${(props) => props.theme.hoverColor} 0px 5px 15px 5px;
  }
`;

const RecipeElse = styled.span`
  position: absolute;
  right: 30px;
  top: 35px;
  color: #999999;
  font-size: 10px;
  float: right;
  cursor: pointer;
`;
