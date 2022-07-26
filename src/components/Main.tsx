import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import {
  alcoholBucket,
  allRecipeList,
  homeRecipeList,
  topRecipe,
} from "../shared/api";
import { HeartOutlined } from "@ant-design/icons";
import bgimg from "../src_assets/bgimg.png";
import {
  isHomeActiveState,
  isLibraryActiveState,
  isMyActiveState,
  isRecipeActiveState,
  isStoreActiveState,
} from "../atmoms";
import { Footer } from "./Footer";
import Slider from "react-slick";
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

  // 홈화면에 보일 레시피목록
  const { isLoading: homeRecipeLoading, data: homeRecipeData } = useQuery<any>(
    "homeRecipeLists",
    homeRecipeList
  );

  //홈화면 술냉장고 이미지 불러오기
  const { isLoading: alcoholBucketLoading, data: alcoholBucketData } =
    useQuery<any>("alcoholBuckets", alcoholBucket);

  console.log(alcoholBucketData);

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
  return (
    <>
      <AllList>
        <BgImgDiv>
          <img src={bgimg} />
        </BgImgDiv>

        <LOGO>로고가 들어갈 자리</LOGO>

        <MyList>
          <ListCard>
            <Head>닉네임</Head>
          </ListCard>

          <PlusCard
            onClick={() => {
              setHomeActive(false);
              setRecipeActive(false);
              setLibraryActive(true);
              setStoreActive(false);
              setMyActive(false);
              navigate("/alcoholLibrary/62c3de5f57b3cc6babc431bf");
            }}
          >
            <p style={{ width: "100%", textAlign: "center" }}>
              <PlusOutlined />
            </p>
          </PlusCard>
        </MyList>
        <CocktailTitle>추천 칵테일</CocktailTitle>

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
                            <img src={x.image} />
                          </DetailImage>

                          <RecipeStep>{x.title}</RecipeStep>
                          <DetailComment>{x.brief_description}</DetailComment>
                          {/* <DetailExplanation>
                  <DetailExplain>{x.alc}</DetailExplain>
                  <DetailExplain>{x.flavour}</DetailExplain>
                  <DetailExplain>{x.country}</DetailExplain>
                </DetailExplanation> */}
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
                <RecipeWrap key={x._id}>
                  <Img src={x.image} alt="" />
                  <TextWrap>
                    <Title>{x.title}</Title>
                    <Desc>DescriptionDescriptionDescriptionDescription</Desc>
                    <span></span>
                    <Info>
                      <UserInfo>작성자 | 9999.99.99</UserInfo>
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
          <Div></Div>
        </RecipeContainer>
        <Footer />
      </AllList>
    </>
  );
};

const AllList = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  text-align: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const LOGO = styled.div`
  position: relative;
  text-align: center;
  margin: 5%;
`;

const MyList = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);

  /* linear-gradient(
    to bottom right,
    ${(props) => props.theme.bggrColor},
    ${(props) => props.theme.bgColor}
  ); */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: auto;
  width: 70%;
  height: 300px;

  border-radius: 25px;
`;
const ListCard = styled.div`
  width: 80%;
  height: 35%;
  margin: 20px auto;
  /* border: 1px solid; */
  border-radius: 10px;
  align-items: center;
  /* padding: 10px; */
  background-color: #ffffff;
  color: black;
`;

const PlusCard = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  width: 80%;
  height: 35%;
  margin: 20px auto;

  /* border: 1px solid; */
  border-radius: 10px;

  /* padding: 10px; */
  background-color: ${(props) => props.theme.plusColor};
  color: #534e4e;
  cursor: pointer;

  :hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 5px 15px 0px;
  }
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
`;

const CocktailTitle = styled.h1`
  font-weight: bold;
  font-size: 20px;
  float: left;
  margin: 10% 0px 3% 0px;
  padding-left: 3%;
`;

const CocktailList = styled.div`
  background-color: red;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: auto;
  width: 100%;
  height: 100px;
  border: solid 1px ${(props) => props.theme.bgColor};
  border-radius: 5px;
`;

const CocktailCard = styled.div`
  /* position: relative; */
  top: 30px;
  width: 95%;
  height: 50%;
  margin: 20% 5% 10% 4%;
  border: 1px solid transparent;
  /* border: 1px solid ${(props) => props.theme.bggrColor}; */
  border-radius: 10px;
  align-items: center;
  /* padding: 10px; */
  background-color: #ff2134;
  color: white;
`;
const RecipeTitle = styled.h1`
  font-weight: bold;
  font-size: 20px;
  float: left;
  margin: 5% 0px 5% 0px;
  padding-left: 3%;
`;

const RecipeList = styled.div`
  /* background-color: red; */
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  margin: auto;
  width: 100%;
  height: 100px;
  border: solid 1px ${(props) => props.theme.bgColor};
  border-radius: 5px;
`;
const RecipeCard = styled.div`
  width: 85%;
  height: 80%;
  margin: auto;
  /* border: 1px solid ${(props) => props.theme.bggrColor}; */
  border-radius: 10px;
  align-items: center;
  /* padding: 10px; */
  background-color: ${(props) => props.theme.recipebgColor};
  color: black;
  cursor: pointer;

  :hover {
    box-shadow: ${(props) => props.theme.hoverColor} 0px 5px 15px 5px;
  }
`;

const RecipeElse = styled.span`
  position: absolute;
  right: 5px;
  top: 27px;
  color: #999999;
  font-size: 13px;

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

const RecipeContainer = styled.div`
  margin: 5% 5% 5% 5%;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0px;

  width: 400px;
  height: 370px;
  opacity: 0.8;
  background: linear-gradient(to left, #37bfff, #a62dff, #fa0671);
  /* border-radius: 20px; */
  /* box-shadow: inset 0 0px 15px 15px black; */
`;

const BackgroundHalfcircle = styled.div`
  top: 360px;
  position: absolute;
  background-color: black;
  width: 400px;
  height: 10px;

  border-radius: 300px 300px 0px 0px;
`;

const BgImgDiv = styled.div`
  width: 400px;
  height: 350px;

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
  margin: 10% 0 0 0;
  width: 370px;
  height: 300px;
  /* border: 2px solid green; */
  /* position: relative; */

  top: 380px;
  align-items: center;
  justify-content: center;
`;

const StyledSlider = styled(Slider)`
  .slick-prev {
    left: 20px !important;
    z-index: 1000;
  }

  .slick-next {
    right: 20px !important;
    z-index: 1000;
  }

  .slick-dots {
    display: flex;
    width: 100px;
    margin: 0;
    padding: 0;
    left: 50%;
    bottom: -80px;
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
  margin: 35px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 25px;
`;

const DetailImage = styled.div`
  margin: auto auto auto auto;
  width: 30%;
  /* box-shadow: 0px -5px 35px 2px white; */
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

const DetailExplain = styled.p`
  margin: auto;
`;

const DetailExplanation = styled.div`
  display: flex;
  align-items: center;
`;

const HalfCircle = styled.div`
  position: absolute;
  margin: 0px auto 0px auto;
  top: 54%;
  /* right: 10%; */
  background: linear-gradient(to bottom, white, #ff2134);
  width: 370px;
  height: 185px;

  border-radius: 185px 185px 0px 0px;
`;
