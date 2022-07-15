import {
  allRecipeListDetailRecipe,
  allRecipeListDetailImage,
  myrecipeListDetial,
} from "../shared/api";
import styled from "styled-components";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import Slider from "react-slick";
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

export const RecipeSearchDetail = () => {
  const params = useParams<keyof ImyreipeId>();
  const myrecipeId = params.myrecipeId;
  const { isLoading: RecipeSearchDetailLoading, data: RecipeSearchDetailData } =
    useQuery<Imyrecipe[]>(["RecipeSearchDetailList", myrecipeId], () =>
      myrecipeListDetial(myrecipeId!)
    );
  console.log(RecipeSearchDetailData);

  return (
    <Cointainer>
      {RecipeSearchDetailLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          {RecipeSearchDetailData?.map((x) => (
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
