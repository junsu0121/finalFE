import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import { useQuery } from "react-query";
import { alcoholDetail } from "../shared/api";
import { useParams } from "react-router";
import styled from "styled-components";
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
  __v: number;
  _id: string;
}

export const AlcoholRecipeDetail = () => {
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
          <div></div>
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
