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
              {/* <SliderDiv2 className="carousel">
                <StyledSlider2 {...settings2}>
                  {x.ingredients.map((v, i) => (
                    <RecipeStepDiv>
                      <RecipeIngredientTextDiv key={i}>
                        {v}
                      </RecipeIngredientTextDiv>
                    </RecipeStepDiv>
                  ))}
                </StyledSlider2>
              </SliderDiv2>
              {RecipeImgsLoading ? null : (
                <SliderDiv3 className="carousel">
                  <StyledSlider2 {...settings2}>
                    {RecipeImgsData.map((x, i) => (
                      <RecipeStepDiv key={i}>
                        <RecipeIngredientTextDiv>
                          <RecipeImg src={x} />
                        </RecipeIngredientTextDiv>
                      </RecipeStepDiv>
                    ))}
                  </StyledSlider2>
                </SliderDiv3>
              )} */}
              <div>
                <RecipeSpanDiv>
                  <RecipeSpan>방법</RecipeSpan>
                </RecipeSpanDiv>
                {/* <SliderDiv className="carousel">
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
              </SliderDiv> */}
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
  font-size: 20px;
  font-weight: 400;
  margin-top: 8%;
`;

const RecipeComment = styled.div`
  /* position: absolute; */
  font-size: 15px;
  margin: 5% auto auto auto;
  justify-content: center;
  align-items: center;
  /* top: 270px; */
`;

const RecipeIngredientBox = styled.div`
  position: absolute;
  top: 380px;
  margin-left: 10%;
  width: 80%;
  border: 1px solid white;
  /* display: flex; */
  /* justify-content: space-between; */
  padding: 10px 1px;
`;

const RecipeIngredient = styled.div`
  /* display: flex; */

  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  margin: 10%;
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
  top: 860px;
`;

const RecipeSpan = styled.span`
  font-size: 17px;

  font-weight: bold;
`;

const SliderDiv = styled.div`
  margin: 80% auto auto auto;
  width: 280px;
  height: 80px;
  /* position: relative; */

  /* top: 200px; */
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

const RecipeStepDiv2 = styled.div`
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

const SliderDiv2 = styled.div`
  margin: auto;
  width: 280px;
  height: 80px;
  position: relative;

  top: 260px;
  align-items: center;
  justify-content: center;
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
const RecipeIngredientTextDiv2 = styled.div`
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
  top: 500px;
`;

const SliderDiv3 = styled.div`
  margin: auto;
  width: 280px;
  height: 80px;
  position: relative;

  top: 50px;
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
  margin-top: 360px;
`;
