import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  isHomeActiveState,
  isLibraryActiveState,
  isMyActiveState,
  isRecipeActiveState,
  isStoreActiveState,
} from "../atmoms";
import { instance } from "../shared/axios";

export const MyFaAlcohol = () => {
  const navigate = useNavigate();

  const [homeActive, setHomeActive] =
    useRecoilState<boolean>(isHomeActiveState);
  const [recipeActive, setRecipeActive] =
    useRecoilState<boolean>(isRecipeActiveState);
  const [libraryActive, setLibraryActive] =
    useRecoilState<boolean>(isLibraryActiveState);
  const [storeActive, setStoreActive] =
    useRecoilState<boolean>(isStoreActiveState);
  const [myActive, setMyActive] = useRecoilState<boolean>(isMyActiveState);

  const query = useQuery(
    "MyFaAlcohol",
    async () => {
      const response = await instance.get("api/drink/recommendlist");
      return response.data.mydrinks;
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  return (
    <>
      <Container>
        {query.isLoading ? (
          <div>is loading</div>
        ) : (
          query.data.map((v: any) => {
            return (
              <AlcoholWrap
                style={{}}
                key={v._id}
                onClick={() => {
                  setHomeActive(false);
                  setRecipeActive(false);
                  setLibraryActive(true);
                  setStoreActive(false);
                  setMyActive(false);
                  navigate(`/AlcoholLibraryDetail/${v._id}`);
                }}
              >
                <Img src={v.image} alt="" />
                <Title>{v.title_kor}</Title>
                <EnTitle>{v.title_eng}</EnTitle>
              </AlcoholWrap>
            );
          })
        )}
      </Container>
      <Div></Div>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: auto;
  display: grid;
  grid-template-columns: 55% 50%;
  justify-content: space-between;
  //스크롤바 안보이게
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media screen and (min-width: 500px) {
  }
`;
const AlcoholWrap = styled.div`
  border-radius: 3%;
  margin-top: 10%;
  width: 158px;
  height: 243px;
  background-color: ${(props) => props.theme.divBgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Img = styled.img`
  width: 122px;
  height: 162px;
`;

const Title = styled.div`
  margin: 5% 0 3% 0;
  font-weight: bold;
`;
const EnTitle = styled.div`
  font-size: 15px;
  font-weight: bolder;
`;

const Div = styled.div`
  height: 100px;
  width: 100%;
`;
