import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { myrecipeList, allRecipeList } from "../shared/api";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Footer } from "./Footer";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?

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
}

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

export const RecipeSearch = () => {
  const navigate = useNavigate();
  const { isLoading: recipeListLoading, data: recipeListData } = useQuery<
    ImyrecipeList[]
  >("myrecipeLists", myrecipeList, {
    onSuccess: (success) => {
      console.log(success);
    },
  });
  console.log(recipeListData);
  console.log(typeof recipeListData);

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
                <Desc>{x.brief_description}</Desc>
                <span></span>
                <Info>
                  <UserInfo>
                    {x.nickname} | {x.createdAt}
                  </UserInfo>
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
