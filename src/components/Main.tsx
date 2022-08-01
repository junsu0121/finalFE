import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  CloseCircleFilled,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import { alcoholBucket, allRecipeList, topRecipe } from "../shared/api";
import { HeartOutlined } from "@ant-design/icons";
import bgimg from "../src_assets/bgimg.png";
import Logo from "../src_assets/Logo.png";
import {
  isHomeActiveState,
  isLibraryActiveState,
  isMyActiveState,
  isRecipeActiveState,
  isStoreActiveState,
} from "../atmoms";
import { Footer } from "./Footer";
import Slider from "react-slick";
import { ReactElement, useEffect, useRef, useState } from "react";
import { instance } from "../shared/axios";
import { queryClient } from "..";
import { AxiosError } from "axios";
import { getCookie } from "../shared/cookie";

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

interface ItopRecipeData {
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

export const Main = () => {
  const navigate = useNavigate();
  const setDarkAtom = useSetRecoilState(isDarkAtom);

  //푸터 요소들
  const [homeActive, setHomeActive] = useRecoilState(isHomeActiveState);
  const [recipeActive, setRecipeActive] = useRecoilState(isRecipeActiveState);
  const [libraryActive, setLibraryActive] =
    useRecoilState(isLibraryActiveState);
  const [storeActive, setStoreActive] = useRecoilState(isStoreActiveState);
  const [myActive, setMyActive] = useRecoilState(isMyActiveState);

  //레시피 안에 들어갈 요소들

  const { isLoading: allRecipeLoading, data: allRecipeData } = useQuery<
    IallRecipeList[]
  >("allRecipeLists", allRecipeList);

  //홈화면 술냉장고 이미지 불러오기
  interface IalcoholBucketData {
    id: string;
    image: string;
  }
  const { isLoading: alcoholBucketLoading, data: alcoholBucketData } = useQuery<
    IalcoholBucketData[]
  >("alcoholBuckets", alcoholBucket);

  // 레시피 추천순 상위 5
  const { isLoading: topRecipeLoading, data: topRecipeData } = useQuery<
    ItopRecipeData[]
  >("topRecipe", topRecipe);

  const settings = {
    dots: true, // 점 보이게
    infinite: false, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const Bucketsettings = {
    dots: true, // 점 보이게
    infinite: false, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  //술 냉장고 안에 메뉴 버튼 만들기
  const [open, setOpen] = useState<boolean>(false);
  const [deleteBtn, setDeleteBtn] = useState<boolean>(false);

  const { mutate: remove } = useMutation<any, AxiosError, any, any>(
    "alcoholBuckets",
    async (id) => {
      const response = await instance.delete(`api/drink/list/${id}/delete`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("alcoholBuckets");
      },
    }
  );

  const DeleteBtn = () => {
    setDeleteBtn(!deleteBtn);
    setOpen(false);
  };

  const CancelBtn = () => {
    setDeleteBtn(false);
    setOpen(false);
  };

  const RemoveBtn = (id: string) => {
    remove(id);
    setDeleteBtn(false);
    setOpen(false);
  };

  useEffect(() => {
    if (getCookie("token") === undefined) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <AllList>
        <HeaderDiv>
          <BgImgDiv>
            <img src={bgimg} />
          </BgImgDiv>
          <LOGO>
            <img src={Logo} />
          </LOGO>
        </HeaderDiv>
        <MyList>
          {alcoholBucketLoading ? (
            <></>
          ) : (
            <>
              <AlcoholSliderDiv className="carousel">
                <AlcoholSliderSpan>
                  {alcoholBucketData.length}개
                </AlcoholSliderSpan>
                <BucketMenuBtnDiv>
                  <BucketMenuBtn onClick={() => setOpen(!open)}>
                    <MoreOutlined />
                  </BucketMenuBtn>
                  {open ? (
                    <>
                      <BucketMenu1
                        onClick={() => {
                          setHomeActive(false);
                          setRecipeActive(false);
                          setLibraryActive(true);
                          setStoreActive(false);
                          setMyActive(false);
                          navigate("/alcoholLibrary");
                        }}
                      >
                        추가
                      </BucketMenu1>
                      <BucketMenu2 onClick={DeleteBtn}>삭제</BucketMenu2>
                      <BucketMenu3 onClick={CancelBtn}>취소</BucketMenu3>
                    </>
                  ) : null}
                </BucketMenuBtnDiv>
                <StyledSlider {...Bucketsettings}>
                  {alcoholBucketData.map((x, i) => (
                    <AlcoholImageDiv key={x.id}>
                      {deleteBtn ? (
                        <HeartDiv onClick={() => RemoveBtn(x.id)}>
                          <CloseCircleFilled />
                        </HeartDiv>
                      ) : null}

                      <AlcoholImage src={x.image} />
                    </AlcoholImageDiv>
                  ))}
                </StyledSlider>
              </AlcoholSliderDiv>
            </>
          )}
        </MyList>
        <CocktailTitle>이런 칵테일 어떠세요?</CocktailTitle>

        <CocktailCard>
          {topRecipeLoading ? (
            <></>
          ) : (
            <>
              <SliderDiv className="carousel">
                <HalfCircle />
                <StyledSlider {...settings}>
                  {topRecipeData?.map((x, y) => (
                    <>
                      <div key={x._id}>
                        <RecipeStepDiv>
                          <DetailImage>
                            <AlcoholBucketlist src={x.image} />
                          </DetailImage>

                          <RecipeStep>{x.title}</RecipeStep>
                          <DetailComment>{x.brief_description}</DetailComment>
                        </RecipeStepDiv>
                      </div>
                    </>
                  ))}
                </StyledSlider>
              </SliderDiv>
            </>
          )}
        </CocktailCard>

        <RecipeTitle>Btender Recipe</RecipeTitle>
        <div style={{ position: "relative" }}>
          <RecipeElse
            onClick={() => {
              setHomeActive(false);
              setRecipeActive(false);
              setLibraryActive(false);
              setStoreActive(false);
              setMyActive(false);
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
                <RecipeWrap
                  key={x._id}
                  onClick={() => {
                    navigate(`/ourRecipe/${x._id}`);
                  }}
                >
                  <Img src={x.image} alt="" />
                  <TextWrap>
                    <Title>{x.title}</Title>
                    <Desc>{x.brief_description}</Desc>

                    <Info>
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
        </RecipeContainer>
        <FooterDiv>
          <Footer />
        </FooterDiv>
        <Div></Div>
      </AllList>
    </>
  );
};

const AllList = styled.div`
  max-width: 390px;
  min-width: 390px;
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

const LOGO = styled.div`
  width: 200px;
  position: relative;
  text-align: center;
  top: -10px;
  margin: 15% auto 12% auto;
`;

const MyList = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  margin: auto;
  width: 80%;
  height: 300px;
  border-radius: 25px;
`;

const CocktailTitle = styled.h1`
  font-weight: bold;
  font-size: 20px;
  float: left;
  margin: 20% 0px 3% 0px;
  padding-left: 3%;
`;

const CocktailCard = styled.div`
  right: 5px;
  /* top: 30px; */
  width: 95%;
  height: 50%;
  margin: 30% auto 10% auto;
  border: 1px solid transparent;
  border-radius: 10px;
  align-items: center;
  background-color: #ff2134;
  color: white;
`;
const RecipeTitle = styled.h1`
  font-weight: 700;
  font-size: 23px;
  line-height: 100%;
  float: left;
  margin: 5% 0px 8% 0px;
  padding-left: 3%;
`;

const RecipeElse = styled.span`
  position: absolute;
  right: 5px;
  top: 27px;
  color: #999999;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
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
  cursor: pointer;
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

const RecipeContainer = styled.div`
  margin: 5% 5% 5% 5%;
`;

const BgImgDiv = styled.div`
  top: 90px;
  width: 390px;
  height: 305px;
  position: absolute;
  img {
    width: 100%;
    height: 100%;
    opacity: 0.8;
    border-radius: 15px;
  }
`;

const Div = styled.div`
  height: 100px;
  width: 100%;
`;

const SliderDiv = styled.div`
  margin: -25% 0 0 0;
  width: 370px;
  height: 300px;
  top: 280px;
  align-items: center;
  justify-content: center;
`;

const AlcoholSliderDiv = styled.div`
  margin: 10% 0 0 0;
  align-items: center;
  justify-content: center;
`;

const StyledSlider = styled(Slider)`
  .slick-prev {
    left: 1px !important;
    z-index: 1000;
  }
  .slick-next {
    right: 1px !important;
    z-index: 1000;
  }
  .slick-dots {
    display: flex;
    width: 100px;
    margin: 0;
    padding: 0;
    left: 50%;
    bottom: 3px;
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

const RecipeStep = styled.div`
  margin: 35px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 25px;
`;

const DetailImage = styled.div`
  margin: auto auto auto auto;
  width: 30%;
  border-radius: 15px;
  img {
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }
`;
const DetailComment = styled.div`
  align-items: center;
  margin: 15%;
`;

const HalfCircle = styled.div`
  position: relative;
  margin: 0px auto 0px auto;
  top: 54%;
  background: linear-gradient(to bottom, white, #ff2134);
  width: 370px;
  height: 185px;
  border-radius: 185px 185px 0px 0px;
`;

const AlcoholBucketlist = styled.img`
  width: 10px;
  height: 15px;
`;

const AlcoholImageDiv = styled.div`
  height: 250px;
`;

const AlcoholImage = styled.img`
  z-index: 2;
  border-radius: 15px;
  margin: auto;
  width: 100px;
  height: 200px;
`;

const AlcoholSliderSpan = styled.div`
  margin-top: 2.5%;
  margin-bottom: 7.5%;
  margin-right: 80%;
  font-size: 23px;
  font-weight: bold;
`;

const BucketMenuBtnDiv = styled.div`
  position: relative;
  bottom: 45px;
  left: 110px;
`;

const BucketMenuBtn = styled.div`
  right: 120px;
  position: absolute;
  cursor: pointer;
`;

const BucketMenu1 = styled.div`
  display: flex;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: #3a94ff;
  font-weight: bold;
  width: 220px;
  height: 40px;
  left: -20px;
  top: 20px;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1;
  cursor: pointer;
`;

const BucketMenu2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-bottom: 2px solid black;
  background-color: rgba(0, 0, 0, 0.7);
  color: red;
  font-weight: bold;
  width: 220px;
  height: 40px;
  left: -20px;
  top: 60px;
  z-index: 1;
  cursor: pointer;
`;

const BucketMenu3 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  font-weight: bold;
  width: 220px;
  height: 40px;
  left: -20px;
  top: 100px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 1;
  cursor: pointer;
`;

const HeartDiv = styled.div`
  font-size: 20px;
  justify-content: space-between;
  height: 30px;
  position: absolute;
  margin-left: 117px;
  margin-bottom: 50px;
  top: -3px;
  color: red;
  cursor: pointer;
`;

const HeaderDiv = styled.div`
  position: relative;
`;

const FooterDiv = styled.div`
  position: absolute;
`;
