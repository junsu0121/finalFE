import styled from "styled-components";
import { HeartFilled } from "@ant-design/icons";
import { useQuery } from "react-query";
import { instance } from "../shared/axios";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import {
  isHomeActiveState,
  isLibraryActiveState,
  isMyActiveState,
  isRecipeActiveState,
  isStoreActiveState,
} from "../atmoms";

export const MyFaRecipe = () => {
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
    "MyFaRecipe",
    async () => {
      const response = await instance.get("api/recipe/list/getrecipe");
      return response.data.myrecipes;
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
          query.data?.map((v: any) => {
            return (
              <RecipeWrap
                key={v._id}
                onClick={() => {
                  setHomeActive(false);
                  setRecipeActive(true);
                  setLibraryActive(false);
                  setStoreActive(false);
                  setMyActive(false);
                  if (v.label === "given") {
                    navigate(`/ourRecipe/${v._id}`);
                  } else {
                    navigate(`/recipe/search/${v._id}`);
                  }
                }}
              >
                <Img src={v.image} alt="" />
                <TextWrap>
                  <Title>{v.title}</Title>
                  <Desc>
                    {v.brief_description.length < 30
                      ? v.brief_description
                      : v.brief_description.slice(0, 30) + "..."}
                  </Desc>
                  <span></span>
                  <Info>
                    <span
                      style={{
                        fontSize: "13px",
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "90%",
                      }}
                    >
                      <div style={{ marginRight: "5px" }}>
                        <HeartFilled style={{ color: "red" }} />
                      </div>
                    </span>
                  </Info>
                </TextWrap>
              </RecipeWrap>
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
  justify-content: center;
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

const RecipeWrap = styled.div`
  margin-bottom: 5%;
  width: 335px;
  height: 132px;
  background-color: ${(props) => props.theme.divBgColor};
  border-radius: 3%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: space-around;
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
  margin-left: 5%;
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
const Div = styled.div`
  height: 100px;
  width: 100%;
`;
