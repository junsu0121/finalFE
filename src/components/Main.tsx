import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { allRecipeList } from "../shared/api";
import { HeartOutlined } from "@ant-design/icons";
import bgimg from "../src_assets/bgimg.png";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
interface IallRecipeList {
  _id: string;
  __v: string;
  title: string;
  steps: string[];
  recommends: number;
  recommender_list: string[];
  keywords: string;
  ingredients: string[];
  image: string;
  categoryId: string;
  brief_description: string;
  alc: number;
}

export const Main = () => {
  const navigate = useNavigate();
  const setDarkAtom = useSetRecoilState(isDarkAtom);

  //레시피 안에 들어갈 요소들

  const { isLoading: allRecipeLoading, data: allRecipeData } = useQuery<
    IallRecipeList[]
  >("allRecipeLists", allRecipeList);

  return (
    <>
      <AllList>
        <BgImgDiv>
          <img src={bgimg} />
        </BgImgDiv>

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
              navigate("/ourRecipe");
            }}
          >
            더보기
          </RecipeElse>
        </div>
        <RecipeContainer>
          {allRecipeLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {allRecipeData?.slice(0, 3).map((x) => (
                <RecipeWrap key={x._id}>
                  <Img src={x.image} alt="" />
                  <TextWrap>
                    <Title>{x.title}</Title>
                    <Desc>DescriptionDescriptionDescriptionDescription</Desc>
                    <span></span>
                    <Info>
                      <UserInfo>작성자 | 9999.99.99</UserInfo>
                      <span
                        style={{
                          fontSize: "13px",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div style={{ marginRight: "5px" }}>
                          <HeartOutlined />
                        </div>
                        {x.ingredients.length}
                      </span>
                    </Info>
                  </TextWrap>
                </RecipeWrap>
              ))}
            </>
          )}
        </RecipeContainer>
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
  position: relative;
  text-align: center;
  margin: 5%;
`;

const MyList = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);

  /* linear-gradient(
    to bottom right,
    ${(props) => props.theme.bggrColor},
    ${(props) => props.theme.bgColor}
  ); */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: auto;
  width: 70%;
  height: 300px;

  border-radius: 25px;
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
  margin: 5% 0px 5% 0px;
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
  right: 5px;
  top: 27px;
  color: #999999;
  font-size: 13px;

  cursor: pointer;
`;

const RecipeWrap = styled.div`
  margin-bottom: 5%;
  width: 335px;
  height: 132px;
  background-color: ${(props) => props.theme.divBgColor};
  border-radius: 3%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 121px;
  height: 108px;
  border-radius: 3%;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%; ;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const Desc = styled.div`
  font-weight: bolder;
  margin: 5% 0 5% 0;
  word-break: break-all;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  font-size: 13px;
  font-weight: bolder;
`;

const RecipeContainer = styled.div`
  margin: 5% 5% 5% 5%;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0px;

  width: 400px;
  height: 370px;
  opacity: 0.8;
  background: linear-gradient(to left, #37bfff, #a62dff, #fa0671);
  /* border-radius: 20px; */
  /* box-shadow: inset 0 0px 15px 15px black; */
`;

const BackgroundHalfcircle = styled.div`
  top: 360px;
  position: absolute;
  background-color: black;
  width: 400px;
  height: 10px;

  border-radius: 300px 300px 0px 0px;
`;

const BgImgDiv = styled.div`
  width: 400px;
  height: 350px;

  position: absolute;

  img {
    width: 100%;
    height: 100%;
    opacity: 0.8;

    border-radius: 15px;
  }
`;
