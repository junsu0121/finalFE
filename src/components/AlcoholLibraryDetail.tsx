import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import { useMutation, useQuery } from "react-query";
import { alcoholDetail, alcoholDetails, alcoholHeart } from "../shared/api";
import { useParams } from "react-router";
import styled from "styled-components";
import { Footer } from "./Footer";
import { DDabong } from "./DDabong";
import { instance } from "../shared/axios";
import { queryClient } from "..";
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getCookie } from "../shared/cookie";
import Heart from "../src_assets/Heart.png";
import {
  HeartFilled,
  HeartOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
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

interface IalcoholHeartData {
  Myrecipe: string[];
  Store: string[];
  category: string;
  drinks: IalcoholDetailData[];
  nickname: string;
  userId: string;
  __v: number;
  _id: string;
}

export const AlcoholLibraryDetail = () => {
  const params = useParams<keyof IdrinkId>();
  const drinkId = params.drinkId;
  const { isLoading: alcoholLoading, data: alcoholDetialData } = useQuery<
    IalcoholDetailData[]
  >(["List", drinkId], () => alcoholDetail(drinkId!));
  // console.log(alcoholDetialData);

  // 술 좋아요 확인 여부
  const [heart, setHeart] = useState(false);
  const [deleteHeart, setDeleteHeart] = useState(true);
  const { isLoading: alHeartLoading, data: alHeartData } = useQuery<any>(
    ["alHeart", drinkId],
    () => alcoholDetails(drinkId!)
  );
  console.log(alHeartData);

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
        window.alert("좋아요");
      },
    }
  );

  const onClickHeart = () => {
    // e.preventDefault();
    setHeart(!heart);
    heartAlcohol();
    console.log(alHeartData);
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
    setDeleteHeart(!deleteHeart);
    deletealHeart();
    console.log(alHeartData);
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
    // const formdata = new FormData()
    // formdata.append("image" , Image)

    postimage({ token, config });
    console.log("포스트요청");
    window.alert("나의 냉장고에 추가 되었습니다.");
  };

  // 술 상세페이지에 들어가는 레시피들
  const Eng_title = alcoholDetialData[0].title_eng
  const DetailRecipe = useQuery("DetailRecipe",
    async () => {
      const response = await instance.get(`/api/recipe/list/getrelatedrecipes/${Eng_title}`)
    },{
      onError: (err) => {
        console.log(err);
      },
    }
  )
    console.log(DetailRecipe , "레시피들")
  return (
    <Cointainer>
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
                  <DetailExplain>{x.alc}</DetailExplain>
                  <DetailExplain>{x.flavour}</DetailExplain>
                  <DetailExplain>{x.country}</DetailExplain>
                </DetailExplanation>{" "}
              </Detail>
            </>
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
const List = styled.div``;
const DetailTitle = styled.p`
  margin: 5%;
  font-size: 27px;
  font-weight: bold;
`;

const DetailComment = styled.div`
  align-items: center;
  margin: 5%;
`;

const DetailExplanation = styled.div`
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
