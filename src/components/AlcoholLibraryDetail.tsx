import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import { useQuery } from "react-query";
import { alcoholDetail } from "../shared/api";
import { useParams } from "react-router";
import styled from "styled-components";
import { Footer } from "./Footer";
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
  title_eng: string;
  title_kor: string;
  short_description: string;
  __v: number;
  _id: string;
}

export const AlcoholLibraryDetail = () => {
  const params = useParams<keyof IdrinkId>();
  const drinkId = params.drinkId;
  const { isLoading: alcoholLoading, data: alcoholDetialData } = useQuery<
    IalcoholDetailData[]
  >(["List", drinkId], () => alcoholDetail(drinkId!));
  console.log(alcoholDetialData);

  const isDark = useRecoilValue(isDarkAtom);
  return (
    <Cointainer>
      {alcoholLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          {alcoholDetialData?.map((x) => (
            <>
              <HalfCircle />
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
                </DetailExplanation>
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
  right: 7%;
  background: linear-gradient(to bottom, white, black);
  width: 450px;
  height: 225px;

  border-radius: 225px 225px 0px 0px;
`;
