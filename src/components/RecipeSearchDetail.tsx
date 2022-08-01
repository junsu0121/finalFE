import * as React from "react";
import {
  allRecipeListDetailRecipe,
  allRecipeListDetailImage,
  myrecipeListDetial,
  myrecipeHeartList,
  myrecipeListDetialImg,
} from "../shared/api";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { QueryClient, useMutation, useQuery } from "react-query";
import Slider from "react-slick";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { getCookie } from "../shared/cookie";
import axios from "axios";
import { instance } from "../shared/axios";
import { queryClient } from "../index";
import Heart from "../src_assets/Heart.png";
import { Footer } from "./Footer";
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
  const navigate = useNavigate();
  const params = useParams<keyof ImyreipeId>();
  const myrecipeId = params.myrecipeId;
  const { isLoading: RecipeSearchDetailLoading, data: RecipeSearchDetailData } =
    useQuery<Imyrecipe[]>(["RecipeSearchDetailList", myrecipeId], () => {
      return myrecipeListDetial(myrecipeId!);
    });
  // console.log(RecipeSearchDetailData);

  // 유저 제공 레시피 전용 api
  const UserRecipeIngrdients = useQuery(
    ["UserRecipeIngrdients", myrecipeId],
    async () => {
      const response = await instance.get(
        `/api/myrecipe/post/detail/${myrecipeId}`
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  console.log(UserRecipeIngrdients);

  // 재료 이미지들 불러오기
  const { isLoading: RecipeImgsLoading, data: RecipeImgsData } = useQuery<
    string[]
  >(["RecipeImgs", myrecipeId], () => {
    return myrecipeListDetialImg(myrecipeId);
  });

  console.log(RecipeImgsData);
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
    window.alert("추천하였습니다.");
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
    window.alert("추천 취소 하였습니다.");
    remove(userId);
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
                style={{ fontSize: "24px" }}
                onClick={onAddHeart}
              ></HeartOutlined>
            ) : (
              <img
                src={Heart}
                alt=""
                style={{ fontSize: "30px" }}
                onClick={() => clickCancelHeart(userId)}
              ></img>
            )}
          </DDabongDiv>
          <Entity
            onClick={() => {
              navigate("/recipe/search");
            }}
          >
            &lt;
          </Entity>
        </>
      )}
      {UserRecipeIngrdients.isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          {UserRecipeIngrdients?.data.recipeInfo.map((x: any) => (
            <div key={x._id}>
              <RecipeTitle>{x.title}</RecipeTitle>
              <RecipeNickname>{x.nickname}</RecipeNickname>
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
      <Div></Div>
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
  font-size: 25px;
  font-weight: 500;
  line-height: 100%;
  margin-top: 10%;
`;

const RecipeComment = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 144%;
  margin: 10%;
`;

const RecipeImage = styled.img`
  width: 100px;
  height: 200px;
  margin: 5%;
  width: 200px;
`;

const DDabongDiv = styled.div`
  margin-left: 78%;
  margin-top: 15%;
  width: 30px;
  cursor: pointer;
`;

const RecipeNickname = styled.div`
  size: 15px;
  font-weight: 400;
  font-size: 15px;
  line-height: 144%;
  margin: 3%;
`;

const RecipeSpanDiv = styled.tr`
  margin-left: 7%;
  position: absolute;
  top: 860px;
`;

const RecipeSpan = styled.span`
  font-size: 24px;
  /* font: bold; */
  font-weight: bold;
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
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
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
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
`;
const Div = styled.div`
  height: 130px;
  width: 100%;
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

const RecipeSpanDiv1 = styled.tr`
  margin-left: 7%;
  position: absolute;
  top: 520px;
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

const RecipeImg = styled.img`
  border-radius: 10px;
  width: 90px;
  height: 120px;
`;

const Entity = styled.div`
  position: absolute;
  font-size: 30px;
  font-weight: bolder;
  top: -1%;
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
  margin-top: 400px;
`;
