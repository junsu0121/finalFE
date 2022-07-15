import {
  allRecipeListDetailRecipe,
  allRecipeListDetailImage,
} from "../shared/api";
import styled from "styled-components";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { Footer } from "./Footer";
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
  console.log(recipeDetialData);

  const settings = {
    dots: true, // 점 보이게
    infinite: false, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 4, //4장씩 보이게 해주세요
    slidesToScroll: 1, //1장씩 넘어가세요
  };

  return (
    <Cointainer>
      {recipeDetailImageLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          {recipeDetialData?.map((x) => (
            <div key={x._id}>
              <RecipeTitle>{x.title}</RecipeTitle>
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
              <RecipeSpanDiv>
                <RecipeSpan>방법</RecipeSpan>
              </RecipeSpanDiv>

              {x.steps.map((z, y) => (
                <>
                  <RecipeStepDiv>
                    <RecipeStepNumber>STEP{y + 1}</RecipeStepNumber>

                    <RecipeStep>{z}</RecipeStep>
                  </RecipeStepDiv>
                </>
              ))}
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
  margin: 20%;
  top: 210px;
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
  margin: 10px;

  /* span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  } */
`;

const ProductImgWrap = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 10px;
`;

const StyledSlider = styled(Slider)`
  .slick-prev {
    left: 10px !important;
    z-index: 1000;
  }

  .slick-next {
    right: 10px !important;
    z-index: 1000;
  }

  .slick-dots {
    display: flex;
    width: 100px;
    margin: 0;
    padding: 0;
    left: 50%;
    bottom: 10px;
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

const ProductImg = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
`;

const RecipeImage = styled.img`
  margin: 3%;
  width: 200px;
`;

const RecipeSpan = styled.span`
  font-size: 17px;
  font: bold;
  font-weight: 400;
`;

const RecipeSpanDiv = styled.div`
  margin-left: 7%;
  position: absolute;
  top: 570px;
`;

const RecipeStepDiv = styled.div`
  position: relative;
  top: 60px;
  margin: 5px;
  display: grid;
  grid-template-columns: repeat(1, 300px);
  grid-template-rows: repeat(1, 40px);
  grid-auto-flow: dense;
  justify-items: start;
  justify-content: space-between;
  align-content: start;
  border: 1px solid white;
  float: left;
`;
const RecipeStepNumber = styled.div`
  display: flex;
  margin-top: 5px;
`;

const RecipeStep = styled.div`
  display: flex;
`;
