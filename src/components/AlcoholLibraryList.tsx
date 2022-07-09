import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { useQuery } from "react-query";
import { alcoholList } from "../shared/api";
import { useNavigate, useParams } from "react-router";

interface IalcoholId {
  categoryId: string;
}
interface IalcoholData {
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
//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const AlcoholLibraryList = () => {
  const navigate = useNavigate();
  const params = useParams<keyof IalcoholId>();

  const alcoholId = params.categoryId;

  const { isLoading: alcoholLoading, data: alcoholData } = useQuery<
    IalcoholData[]
  >(["List", alcoholId], () => alcoholList(alcoholId!));
  console.log(alcoholData);
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <Cointainer>
      {alcoholLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          <CardWrap>
            {alcoholData?.map((x) => (
              <AlcoholCard
                onClick={() => {
                  navigate(`/alcoholRecipeDetail/${x._id}`);
                }}
              >
                <img src={x.image} />
                <p>{x.title_kor}</p>
                <p>{x.title_eng}</p>
              </AlcoholCard>
            ))}
          </CardWrap>
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

const CardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const AlcoholCard = styled.div`
  display: flex;
  cursor: pointer;
  margin: 10% 0%;
  width: 40%;
  height: 30%;
  border: 1px solid white;
  background-color: "#af2929";
  img {
    display: flex;
    width: 100%;
    height: 70%;
  }
`;
