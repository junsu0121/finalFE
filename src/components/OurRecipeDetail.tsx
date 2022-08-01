import {
  allRecipeListDetailRecipe,
  allRecipeListDetailImage,
  allRecipeListDetailHeartRecipe,
} from "../shared/api";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Footer } from "./Footer";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { instance } from "../shared/axios";
import { queryClient } from "..";
import Heart from "../src_assets/Heart.png";

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
  id: string;
  categoryId: string;
  brief_description: string;
  alc: number;
  RecipeId: string;
}

export const OurRecipeDetail = () => {
  const navigate = useNavigate();
  const params = useParams<keyof IrecipeId>();
  const recipeId = params.recipeId;

  // 레시피 재료 전용 api

  const RecipeIngrdients = useQuery(
    ["RecipeIngrdients", recipeId],
    async () => {
      const response = await instance.get(`api/recipe/list/detail/${recipeId}`);
      return response.data;
    },

    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  // 레시피 추천 확인
  const [heart, setHeart] = useState(false);
  const [deleteHeart, setDeleteHeart] = useState(true);
  const { isLoading: recipeDetailHeartLoading, data: recipeDetialHeartData } =
    useQuery<any>(["recipeDetialHeartData", recipeId], () =>
      allRecipeListDetailHeartRecipe(recipeId!)
    );

  // 좋아요 기능 추가
  const { mutate: addHeart } = useMutation(
    "recipeDetialHeartData",
    async () => {
      const response = await instance.put(
        `api/recipe/list/recommend/${recipeId}`,
        { recommend: heart }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("recipeDetialHeartData");
        window.alert("추천하였습니다.");
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
        `api/recipe/list/undorecommend/${recipeId}`,
        { recommend: deleteHeart }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("recipeDetialHeartData");
        window.alert("추천 취소 하였습니다.");
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

  const settings2 = {
    dots: false, // 점 보이게
    infinite: false, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <Cointainer>
      <DDabongDiv>
        {recipeDetialHeartData ? (
          <img
            src={Heart}
            alt=""
            style={{ fontSize: "30px" }}
            onClick={unclickHeart}
          ></img>
        ) : (
          <HeartOutlined
            style={{ fontSize: "24px" }}
            onClick={clickHeart}
          ></HeartOutlined>
        )}
      </DDabongDiv>
      <Entity
        onClick={() => {
          navigate("/ourRecipe");
        }}
      >
        &lt;
      </Entity>
      {RecipeIngrdients.isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          {RecipeIngrdients?.data.recipeInfo.map((x: any) => (
            <div key={x._id}>
              <RecipeTitle>{x.title}</RecipeTitle>
              <RecipeImage src={x.image} />
              <RecipeComment>{x.brief_description}</RecipeComment>

              <RecipeSpanDiv1>
                <RecipeSpan>재료</RecipeSpan>
              </RecipeSpanDiv1>

              <SliderDiv3 className="carousel">
                <StyledSlider2 {...settings2}>
                  {x.drink_info.map((z: any, i: number) => (
                    <RecipeStepDiv key={i}>
                      <RecipeIngredientTextDiv>
                        <RecipeImg src={z.recipeImages} />
                      </RecipeIngredientTextDiv>
                      <RecipeIngredientTextDiv>
                        {z.recipeIngredients}
                      </RecipeIngredientTextDiv>
                    </RecipeStepDiv>
                  ))}
                </StyledSlider2>
              </SliderDiv3>
              <div>
                <RecipeSpanDiv2>
                  <RecipeSpan>방법</RecipeSpan>
                </RecipeSpanDiv2>

                <RecipeWrapDiv>
                  {x.steps.map((z: string, y: number) => (
                    <>
                      <div key={x._id}>
                        <RecipeWrap>
                          <RecipeStepDiv>
                            <RecipeStepNumber>STEP{y + 1}</RecipeStepNumber>
                            <RecipeStep>{z}</RecipeStep>
                          </RecipeStepDiv>
                        </RecipeWrap>
                      </div>
                    </>
                  ))}
                </RecipeWrapDiv>
              </div>
            </div>
          ))}
        </>
      )}
      <Footer />
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
  font-size: 15px;
  margin: 10%;
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

const RecipeSpanDiv1 = styled.tr`
  margin-left: 7%;
  position: absolute;
  top: 520px;
`;

const RecipeSpanDiv2 = styled.tr`
  margin-left: 7%;
  position: absolute;
  top: 860px;
`;

const RecipeIngredientTextDiv = styled.div`
  display: flex;
  height: 120px;
  margin: 3px;
  background-color: #3d3d3d;
  border-radius: 12px;
  /* border: solid 1px white; */
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const RecipeStepDiv = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

const RecipeStepNumber = styled.div`
  /* border: 1px solid white; */
  width: 180px;
  text-align: left;
  /* margin: 20px; */
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 13px;
`;

const RecipeStep = styled.div`
  width: 290px;
  text-align: left;
  margin: 15px;
  align-items: center;
  justify-content: center;
`;

const SliderDiv3 = styled.div`
  margin: auto;
  width: 280px;
  height: 80px;
  position: relative;

  top: 110px;
  align-items: center;
  justify-content: center;
`;

const StyledSlider2 = styled(Slider)`
  .slick-prev {
    left: -20px !important;
    z-index: 1000;
  }

  .slick-next {
    right: -20px !important;
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

const Div = styled.div`
  height: 130px;
  width: 100%;
`;

const RecipeImg = styled.img`
  border-radius: 10px;
  width: 90px;
  height: 120px;
`;

const Entity = styled.div`
  position: absolute;
  font-size: 30px;
  font-weight: bolder;
  top: 6%;
  left: 7%;
  mix-blend-mode: difference;
  cursor: pointer;
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

const RecipeWrapDiv = styled.div`
  margin-top: 320px;
`;
