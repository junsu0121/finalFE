import * as React from "react";
import {
  allRecipeListDetailRecipe,
  allRecipeListDetailImage,
  myrecipeListDetial,
  myrecipeHeartList,
} from "../shared/api";
import styled from "styled-components";
import { useParams } from "react-router";
import { QueryClient, useMutation, useQuery } from "react-query";
import Slider from "react-slick";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { getCookie } from "../shared/cookie";
import axios from "axios";
import { instance } from "../shared/axios";
import { queryClient } from "../index";
//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
interface ImyreipeId {
  myrecipeId: string;
}

interface Imyrecipe {
  brief_description: string;
  createdAt: string;
  image: string;
  ingredients: string[];
  nickname: string;
  title: string;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
}

interface IMyrecipeHeartList {
  myrecipeId: string;
  nickname: string;
  userId: string;
  __v: number;
  _id: string;
}

interface IuserId {
  userId: string;
}

export const RecipeSearchDetail = () => {
  const params = useParams<keyof ImyreipeId>();
  const myrecipeId = params.myrecipeId;
  const { isLoading: RecipeSearchDetailLoading, data: RecipeSearchDetailData } =
    useQuery<Imyrecipe[]>(["RecipeSearchDetailList", myrecipeId], () => {
      return myrecipeListDetial(myrecipeId!);
    });
  console.log(RecipeSearchDetailData);
  // 마이레시피에 좋아요 눌렀는지 확인 여부
  const userId = getCookie("userId");
  const { isLoading: MyrecipeLoading, data: MyrecipeHeartList } = useQuery<
    IMyrecipeHeartList[]
  >(["RecipeSearchHeartList", myrecipeId], () => {
    return myrecipeHeartList(myrecipeId);
  });

  //좋아요 누르기

  const addHeart = useMutation(
    () => {
      return instance.post(`api/favorite/${myrecipeId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("RecipeSearchHeartList");
      },
    }
  );

  const onAddHeart = () => {
    addHeart.mutate(userId);
  };

  // // 좋아요 취소하기

  const { mutate: remove } = useMutation(
    "cancelHeart",
    async (userId) => {
      const response = await instance.delete(
        `api/favorite/${myrecipeId}/delete`
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("RecipeSearchHeartList");
      },
    }
  );

  const clickCancelHeart = (userId: any) => {
    remove(userId);
  };

  return (
    <Cointainer>
      {MyrecipeLoading ? (
        <></>
      ) : (
        <>
          <DDabongDiv>
            {!MyrecipeHeartList.map((z) => z.userId).includes(userId) ? (
              <HeartOutlined
                style={{ fontSize: "30px" }}
                onClick={onAddHeart}
              ></HeartOutlined>
            ) : (
              <HeartFilled
                style={{ fontSize: "30px" }}
                onClick={() => clickCancelHeart(userId)}
              ></HeartFilled>
            )}
          </DDabongDiv>
        </>
      )}
      {RecipeSearchDetailLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          {RecipeSearchDetailData?.map((x) => (
            <div key={x._id}>
              <RecipeTitle>{x.title}</RecipeTitle>
              <RecipeNickname>{x.nickname}</RecipeNickname>
              <RecipeImage src={x.image} />
              <RecipeComment>{x.brief_description}</RecipeComment>
              <RecipeIngredientBox>
                <RecipeIngredient>
                  <span style={{}}>재료</span>
                </RecipeIngredient>
                <RecipeIngredient>
                  {x.ingredients.map((v, i) => (
                    <span key={i}>{v}</span>
                  ))}
                </RecipeIngredient>
              </RecipeIngredientBox>
            </div>
          ))}
        </>
      )}
    </Cointainer>
  );
};

const Cointainer = styled.div`
  position: relative;
  width: 390px;
  height: 844px;
  margin: auto;
  text-align: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const RecipeTitle = styled.h1`
  font-size: 20px;
  font-weight: 400;
  margin-top: 8%;
`;

const RecipeComment = styled.div`
  /* position: absolute; */
  font-size: 15px;
  margin: auto;
  justify-content: center;
  align-items: center;
  /* top: 270px; */
`;

const RecipeIngredientBox = styled.div`
  position: absolute;
  top: 380px;
  margin-left: 10%;
  width: 80%;
  /* border: 1px solid white; */
  display: flex;
  justify-content: space-between;
  padding: 10px 1px;
`;

const RecipeIngredient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid white; */
  margin: 10%;

  /* span:first-child {
      font-size: 10px;
      font-weight: 400;
      text-transform: uppercase;
      margin-bottom: 5px;
    } */
`;

const RecipeImage = styled.img`
  margin: 5%;
  width: 200px;
  height: 200px;
`;

const DDabongDiv = styled.div`
  margin-left: 78%;
  margin-top: 15%;
  width: 30px;
  cursor: pointer;
`;

const RecipeNickname = styled.div`
  margin: 3%;
`;
