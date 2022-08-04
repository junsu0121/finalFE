import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { allRecipeList } from "../shared/api";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { Footer } from "./Footer";
import { getCookie } from "../shared/cookie";
import { useEffect } from "react";
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

interface IrecipeId {
  recipeId: string;
}

export const OurRecipe = () => {
  const navigate = useNavigate();
  const params = useParams<keyof IrecipeId>();
  const recipeId = params.recipeId;
  const { isLoading: allRecipeLoading, data: allRecipeData } = useQuery<
    IallRecipeList[]
  >("allRecipeLists", allRecipeList);

  useEffect(() => {
    if (getCookie("token") === undefined) {
      navigate("/");
    }
  }, []);
  return (
    <Cointainer>
      <LogoTitle>Btender Recipe</LogoTitle>
      {allRecipeLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {allRecipeData?.map((x) => (
            <RecipeWrap
              key={x._id}
              onClick={() => {
                navigate(`/ourRecipe/${x._id}`);
              }}
            >
              <Img src={x.image} alt="" />
              <TextWrap>
                <Title>{x.title}</Title>
                <Desc>
                  {x.brief_description.length < 15
                    ? x.brief_description
                    : x.brief_description.slice(0, 15) + "..."}
                </Desc>
                <span></span>
                <Info>
                  {/* <UserInfo>작성자 | 9999.99.99</UserInfo> */}
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
                    {x.recommends}
                  </span>
                </Info>
              </TextWrap>
            </RecipeWrap>
          ))}
        </>
      )}
      <Div></Div>
      <Footer />
    </Cointainer>
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

const RecipeWrap = styled.div`
  margin: 5% auto;
  width: 335px;
  height: 132px;
  background-color: ${(props) => props.theme.divBgColor};
  border-radius: 3%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Img = styled.img`
  object-fit: cover;
  width: 120px;
  height: 108px;
  overflow: hidden;

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
  width: 220px;
  font-weight: bolder;
  margin: 5% 0 5% 0;
  word-break: break-all;
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LogoTitle = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 100%;
  text-align: left;
  margin: 2%;
  margin-top: 10%;
  margin-bottom: 10%;
  padding-left: 1%;
`;

const Div = styled.div`
  height: 100px;
  width: 100%;
`;
