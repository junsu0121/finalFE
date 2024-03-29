import { useMutation, useQuery } from "react-query";
import { alcoholDetail, alcoholDetails } from "../shared/api";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { Footer } from "./Footer";

import { instance } from "../shared/axios";
import { queryClient } from "..";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getCookie } from "../shared/cookie";
import Heart from "../src_assets/Heart.png";
import { HeartOutlined, PlusSquareOutlined } from "@ant-design/icons";

interface IdrinkId {
  drinkId: string;
}

interface IalcoholDetailData {
  alc: number;
  categoryId: string;
  country: string;
  flavour: string;
  image: string;
  recommend: number;
  recommend_list: string[];
  title_eng: string;
  title_kor: string;
  short_description: string;
  __v: number;
  _id: string;
}

export const AlcoholLibraryDetail = () => {
  const navigate = useNavigate();
  const params = useParams<keyof IdrinkId>();
  const drinkId = params.drinkId;
  const { isLoading: alcoholLoading, data: alcoholDetialData } = useQuery<
    IalcoholDetailData[]
  >(["List", drinkId], () => alcoholDetail(drinkId!));

  // 술 좋아요 확인 여부
  const [heart, setHeart] = useState(false);
  const [deleteHeart, setDeleteHeart] = useState(true);
  const { isLoading: alHeartLoading, data: alHeartData } = useQuery<any>(
    ["alHeart", drinkId],
    () => alcoholDetails(drinkId!)
  );

  // 술 좋아요 기능
  const { mutate: heartAlcohol } = useMutation(
    "alHeart",
    async () => {
      const response = await instance.put(
        `/api/drink//list/recommend/${drinkId}`,
        { recommend: heart }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("alHeart");
      },
    }
  );

  const onClickHeart = () => {
    window.alert("추천하였습니다.");
    // e.preventDefault();
    setHeart(!heart);
    heartAlcohol();
  };
  //술 좋아요 취소 기능
  const { mutate: deletealHeart } = useMutation(
    "alHeart",
    async () => {
      const response = await instance.put(
        `/api/drink/list/undorecommend/${drinkId}`,

        { recommend: deleteHeart }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("alHeart");
      },
    }
  );

  const onClickRemoveHeart = () => {
    window.alert("추천 취소 하였습니다.");
    setDeleteHeart(!deleteHeart);
    deletealHeart();
  };

  //포스팅하기
  const token = getCookie("token");
  const { mutate: postimage } = useMutation<any, AxiosError, any, any>(
    "alcoholBuckets",
    async (token) => {
      const response = await instance.post(
        `/api/drink/list/${drinkId}/post`,
        token,
        config
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("alcoholBuckets");
        console.log(data);
      },
    }
  );
  const config = { headers: { "content-type": "multipart/form-data" } };
  const onClickBucket = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    postimage({ token, config });
    window.alert("나의 냉장고에 추가 되었습니다.");
  };

  // 술 상세페이지에 들어가는 레시피들
  const [recipesTitle, setRecipesTitle] = useState("");
  const Eng_title: string = alcoholLoading
    ? "loading"
    : `${alcoholDetialData[0].title_eng}`;

  const DetailRecipe = useQuery(
    ["DetailRecipe", Eng_title],
    async () => {
      const response = await instance.get(
        `/api/recipe/list/getrelatedrecipes/${Eng_title}`
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("데이터불러오기성공");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    setRecipesTitle(Eng_title);
  }, []);

  // const DetailRecipes = DetailRecipe.isLoading ? "loading" : DetailRecipe;

  // console.log(DetailRecipe.data.recipes, "레시피들");

  return (
    <Cointainer>
      <Entity
        onClick={() => {
          navigate(-1);
        }}
      >
        &lt;
      </Entity>
      <DDabongDiv>
        <AlcoholPlusBtn style={{ fontSize: "30px" }} onClick={onClickBucket}>
          <PlusSquareOutlined />
        </AlcoholPlusBtn>
        {alHeartData ? (
          <img
            src={Heart}
            alt=""
            style={{ fontSize: "30px", width: "30px", height: "30px" }}
            onClick={onClickRemoveHeart}
          ></img>
        ) : (
          <HeartOutlined
            style={{ fontSize: "30px" }}
            onClick={onClickHeart}
          ></HeartOutlined>
        )}
      </DDabongDiv>
      {alcoholLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          {alcoholDetialData?.map((x) => (
            <>
              <HalfCircle />
              {/* <DDabongDiv></DDabongDiv> */}

              <Detail>
                <DetailImage>
                  <img src={x.image} />
                </DetailImage>
                <DetailTitle>{x.title_eng}</DetailTitle>
                <DetailComment>{x.short_description}</DetailComment>
                <DetailExplanation>
                  <DetailExplain>{x.alc}%</DetailExplain>
                  <DetailExplain>{x.flavour}</DetailExplain>
                  <DetailExplain>{x.country}</DetailExplain>
                </DetailExplanation>{" "}
                <RecipeSpan>Recipe</RecipeSpan>
              </Detail>
            </>
          ))}
        </>
      )}
      {DetailRecipe.isLoading
        ? "loading"
        : DetailRecipe.data.recipes.map((v: any) => (
            <>
              <RecipeWrap
                key={v._id}
                onClick={() => {
                  navigate(`/ourRecipe/${v._id}`);
                }}
              >
                <Img src={v.image} alt="" />
                <TextWrap>
                  <Title>{v.title}</Title>
                  <Desc>{v.brief_description}</Desc>
                  <span></span>
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
                      {v.recommends}
                    </span>
                  </Info>
                </TextWrap>
              </RecipeWrap>
            </>
          ))}
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
const Detail = styled.div`
  position: relative;
  margin: auto;
  bottom: 20%;
`;
const DetailImage = styled.div`
  margin: 20% auto auto auto;
  width: 30%;
  box-shadow: 0px -5px 35px 2px white;
  border-radius: 15px;
  img {
    display: flex;
    width: 100%;
    height: 80%;
    border-radius: 15px;
  }
`;

const DetailTitle = styled.p`
  margin: 5%;
  font-weight: 700;
  font-size: 28px;
  line-height: 100%;
`;

const DetailComment = styled.div`
  align-items: center;
  margin: 5%;
  font-weight: 500;
  font-size: 14px;
  line-height: 144%;
`;

const DetailExplanation = styled.div`
  margin-top: 10%;
  display: flex;
  align-items: center;
`;

const DetailExplain = styled.p`
  margin: auto;
`;

const HalfCircle = styled.div`
  position: relative;
  margin: 0px auto 0px auto;
  top: 24%;
  /* right: 10%; */
  background: linear-gradient(to bottom, white, black);
  width: 400px;
  height: 200px;

  border-radius: 200px 200px 0px 0px;
`;

const DDabongDiv = styled.div`
  display: flex;
  margin-left: 78%;
  margin-top: 15%;
  width: 30px;
  cursor: pointer;
`;

const AlcoholPlusBtn = styled.div`
  position: relative;
  right: 40px;
  bottom: 4px;
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

const RecipeSpan = styled.span`
  position: relative;
  font-size: 25px;
  font-weight: bold;
  top: 95px;
  right: 140px;
`;

const Div = styled.div`
  height: 100px;
  width: 100%;
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
