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
import Heart from "../src_assets/Heart.png";
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
  steps: string[];
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

  const settings = {
    dots: true, // 점 보이게
    infinite: false, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
              <img
                src={Heart}
                alt=""
                style={{ fontSize: "35px" }}
                onClick={() => clickCancelHeart(userId)}
              ></img>
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
                  <RecipeIngredientSpan>재료</RecipeIngredientSpan>
                </RecipeIngredient>
                <RecipeIngredient>
                  {x.ingredients.map((v, i) => (
                    <span key={i}>{v}</span>
                  ))}
                </RecipeIngredient>
              </RecipeIngredientBox>
              <RecipeSpanDiv>
                <RecipeSpan>방법</RecipeSpan>
              </RecipeSpanDiv>
              <SliderDiv className="carousel">
                <StyledSlider {...settings}>
                  {x.steps.map((z, y) => (
                    <>
                      <div key={x._id}>
                        <RecipeStepDiv>
                          <RecipeStepNumber>STEP{y + 1}</RecipeStepNumber>
                          <RecipeStep>{z}</RecipeStep>
                        </RecipeStepDiv>
                      </div>
                    </>
                  ))}
                </StyledSlider>
              </SliderDiv>
            </div>
          ))}
        </>
      )}
      <Div></Div>
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

const RecipeIngredientSpan = styled.span`
  font-size: 17px;
  font-weight: bold;
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

const RecipeSpanDiv = styled.tr`
  margin-left: 7%;
  position: absolute;
  top: 650px;
`;

const RecipeSpan = styled.span`
  font-size: 17px;

  font-weight: bold;
`;

const SliderDiv = styled.div`
  margin: auto;
  width: 280px;
  height: 80px;
  position: relative;

  top: 380px;
  align-items: center;
  justify-content: center;
`;

const StyledSlider = styled(Slider)`
  .slick-prev {
    left: -10px !important;
    z-index: 1000;
  }

  .slick-next {
    right: -10px !important;
    z-index: 1000;
  }

  .slick-dots {
    display: flex;
    width: 100px;
    margin: 0;
    padding: 0;
    left: 50%;
    bottom: -10px;
    transform: translate(-50%, -50%);
  }

  .slick-dots li {
    width: 6px;
    height: 6px;
    margin: 0 3.5px;
  }

  .slick-dots li button {
    width: 6px;
    height: 6px;
  }

  .slick-dots li button:before {
    width: 6px;
    height: 6px;
    color: white;
  }

  .slick-dots li.slick-active button:before {
    color: white !important;
  }

  li {
    margin: 0;
    padding: 0;
  }
`;

const RecipeStepDiv = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

const RecipeStepNumber = styled.div`
  margin: 15px;
`;

const RecipeStep = styled.div`
  margin: 15px;
  align-items: center;
  justify-content: center;
`;
const Div = styled.div`
  height: 100px;
  width: 100%;
`;
