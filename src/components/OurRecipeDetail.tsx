import {
  allRecipeListDetailRecipe,
  allRecipeListDetailImage,
  allRecipeListDetailHeartRecipe,
} from "../shared/api";
import styled from "styled-components";
import { useParams } from "react-router";
import { useMutation, useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Footer } from "./Footer";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { instance } from "../shared/axios";
import { queryClient } from "..";
//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?

interface IrecipeId {
  recipeId: string;
}

interface Irecipe {
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

export const OurRecipeDetail = () => {
  const params = useParams<keyof IrecipeId>();
  const recipeId = params.recipeId;
  const { isLoading: recipeDetailLoading, data: recipeDetialData } = useQuery<
    Irecipe[]
  >(["recipeDetailRecipeList", recipeId], () =>
    allRecipeListDetailRecipe(recipeId!)
  );

  const { isLoading: recipeDetailImageLoading, data: recipeDetailImageData } =
    useQuery<string[]>(["recipeDetailImageList", recipeId], () =>
      allRecipeListDetailImage(recipeId!)
    );

  // 레시피 추천 확인
  const [heart, setHeart] = useState(false);
  const [deleteHeart, setDeleteHeart] = useState(true);
  const { isLoading: recipeDetailHeartLoading, data: recipeDetialHeartData } =
    useQuery<any>(["recipeDetialHeartData", recipeId], () =>
      allRecipeListDetailHeartRecipe(recipeId!)
    );
  // console.log(recipeDetialHeartData);

  // 좋아요 기능 추가
  const { mutate: addHeart } = useMutation(
    "recipeDetialHeartData",
    async () => {
      const response = await instance.put(
        `api/recipe/list/${recipeId}/recommend`,
        { recommend: heart }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("recipeDetialHeartData");
        window.alert("이 레시피를 추천하였습니다.");
      },
    }
  );

  const clickHeart = () => {
    setHeart(!heart);
    addHeart();
    console.log(recipeDetialHeartData);
  };

  // 좋아요 기능 취소
  const { mutate: removeHeart } = useMutation(
    "recipeDetialHeartData",
    async () => {
      const response = await instance.put(
        `api/recipe/list/${recipeId}/undorecommend`,
        { recommend: deleteHeart }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("recipeDetialHeartData");
        window.alert("이 레시피를 추천 취소 하였습니다.");
      },
    }
  );

  const unclickHeart = () => {
    setDeleteHeart(!deleteHeart);
    removeHeart();
    console.log(recipeDetialHeartData);
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
      <DDabongDiv>
        {recipeDetialHeartData ? (
          <HeartFilled
            style={{ fontSize: "30px" }}
            onClick={unclickHeart}
          ></HeartFilled>
        ) : (
          <HeartOutlined
            style={{ fontSize: "30px" }}
            onClick={clickHeart}
          ></HeartOutlined>
        )}
      </DDabongDiv>
      {recipeDetailImageLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          {recipeDetialData?.map((x) => (
            <div key={x._id}>
              <RecipeTitle>{x.title}</RecipeTitle>
              <RecipeImage src={x.image} />
              <RecipeComment>{x.brief_description}</RecipeComment>
              <RecipeIngredientTable>
                <RecipeIngredientTr>
                  <span style={{}}>재료</span>
                </RecipeIngredientTr>
                <RecipeIngredientTr>
                  {x.ingredients.map((v, i) => (
                    <span key={i}>{v}</span>
                  ))}
                </RecipeIngredientTr>
              </RecipeIngredientTable>
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
      <Footer />
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
  margin-top: 10%;
`;

const RecipeComment = styled.div`
  position: absolute;
  font-size: 15px;
  margin: 25%;
  top: 250px;
`;

const RecipeIngredientTable = styled.table`
  position: absolute;
  top: 420px;
  margin-left: 10%;
  width: 80%;
  /* border: 1px solid white; */
  display: flex;
  justify-content: space-between;
  padding: 10px 1px;
`;

const RecipeIngredientTr = styled.tr`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 20% 1px 1% 1%;

  /* span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  } */
`;

const RecipeImage = styled.img`
  width: 100px;
  height: 200px;
  margin: 5%;
  width: 200px;
`;

const RecipeSpan = styled.span`
  font-size: 17px;
  font: bold;
  font-weight: 400;
`;

const RecipeSpanDiv = styled.tr`
  margin-left: 7%;
  position: absolute;
  top: 650px;
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

const DDabongDiv = styled.div`
  margin-left: 78%;
  margin-top: 15%;
  width: 30px;
  cursor: pointer;
`;
