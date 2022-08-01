import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { useQuery } from "react-query";
import { alcoholList } from "../shared/api";
import { useNavigate, useParams } from "react-router";
import { getCookie } from "../shared/cookie";
import { useEffect } from "react";

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

export const TEQUILA = () => {
  const navigate = useNavigate();
  const params = useParams<keyof IalcoholId>();

  const categoryId = params.categoryId;

  const { isLoading: alcoholLoading, data: alcoholData } = useQuery<
    IalcoholData[]
  >(["List", categoryId], () => alcoholList(categoryId!));

  const isDark = useRecoilValue(isDarkAtom);

  useEffect(() => {
    if (getCookie("token") === undefined) {
      navigate("/");
    }
  }, []);
  return (
    <Cointainer>
      {alcoholLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <>
          <CardWrap>
            {alcoholData?.map((x) => (
              <AlcoholCard
                key={x._id}
                onClick={() => {
                  navigate(`/AlcoholLibraryDetail/${x._id}`);
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
      <Div></Div>
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
  display: block;
  background-color: "#303030";
  cursor: pointer;
  margin: 10% 0%;
  width: 40%;
  height: 40%;
  border: 1px solid white;
  border-radius: 15px;

  img {
    display: flex;
    border-radius: 15px 15px 0px 0px;
    width: 100%;
    height: 70%;
  }
`;

const Div = styled.div`
  height: 100px;
  width: 100%;
`;
