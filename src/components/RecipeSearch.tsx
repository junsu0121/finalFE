import styled from "styled-components";

import { useQuery } from "react-query";
import { myrecipeList, allRecipeList } from "../shared/api";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Footer } from "./Footer";
import { useEffect } from "react";
import { getCookie } from "../shared/cookie";

interface ImyrecipeList {
  _id: string;
  __v: number;
  userId: string;
  updatedAt: string;
  title: string;
  nickname: string;
  ingredients: any;
  image: string;
  createdAt: string;
  brief_description: string;
  favorite_count: number;
}

export const RecipeSearch = () => {
  const navigate = useNavigate();
  const { isLoading: recipeListLoading, data: recipeListData } = useQuery<
    ImyrecipeList[]
  >("myrecipeLists", myrecipeList, {
    onSuccess: (success) => {
      console.log(success);
    },
  });

  useEffect(() => {
    if (getCookie("token") === undefined) {
      navigate("/");
    }
  }, []);

  return (
    <Cointainer>
      {recipeListLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {recipeListData?.map((x) => (
            <RecipeWrap
              key={x._id}
              onClick={() => {
                navigate(`/recipe/search/${x._id}`);
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
                  <UserInfo>
                    {x.nickname} | {x.createdAt.slice(0, 11)}
                  </UserInfo>
                  &nbsp;
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
                    {x.favorite_count}
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
  margin-left: 4%;
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
  cursor: pointer;
`;
const Img = styled.img`
  min-width: 121px;
  max-width: 121px;
  min-height: 108px;
  max-height: 108px;
  object-fit: cover;

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
  width: 174px;
  height: 30px;

  font-weight: bolder;
  margin: 5% 0 4% 0;
  word-break: break-all;
`;
const Info = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const UserInfo = styled.div`
  font-size: 13px;
  font-weight: bolder;
`;

const Div = styled.div`
  height: 100px;
  width: 100%;
`;
