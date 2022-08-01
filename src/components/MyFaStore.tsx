import styled from "styled-components";
import { HeartFilled, EnvironmentOutlined } from "@ant-design/icons";
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

export const MyFaStore = () => {
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
    "MyFaStore",
    async () => {
      const response = await instance.get("/api/favorite/store/getmystore");
      return response.data.stores;
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
        {query?.isLoading ? (
          <div>is loading</div>
        ) : (
          query.data?.map((v: any) => {
            return (
              <StoreWrap
                key={v._id}
                onClick={() => {
                  setHomeActive(false);
                  setRecipeActive(false);
                  setLibraryActive(false);
                  setStoreActive(true);
                  setMyActive(false);
                  navigate(`/bardetail/${v._id}`);
                }}
              >
                <BarInfoWrap>
                  <Img style={{ backgroundImage: `url(${v.image})` }} />
                  <BarInfo>
                    <BarName>{v.title}</BarName>
                    <BarAddress>
                      <EnvironmentOutlined />
                      {v.address}
                    </BarAddress>
                  </BarInfo>
                </BarInfoWrap>
                <Desc>
                  {v.review.length < 43
                    ? v.review
                    : v.review.slice(0, 43) + "..."}
                </Desc>
                <Info>
                  <UserInfo>
                    {v.nickname} | {v.time}
                  </UserInfo>
                  <span
                    style={{
                      fontSize: "13px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ marginRight: "5px" }}>
                      <HeartFilled style={{ color: "red" }} />
                    </div>
                  </span>
                </Info>
              </StoreWrap>
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
  height: 100%;
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

const StoreWrap = styled.div`
  width: 340px;
  height: 240px;
  background-color: ${(props) => props.theme.divBgColor};
  border-radius: 5%;
  margin-bottom: -20%;
  cursor: pointer;
`;

const Img = styled.div`
  width: 100%;
  height: 155px;
  border-radius: 5%;
  opacity: 0.5;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const BarInfoWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BarInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BarName = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const BarAddress = styled.div`
  font-size: 15px;
  font-weight: bolder;
`;
const Desc = styled.div`
  font-weight: bolder;
  margin: 3% 3% 0 3%;
  word-break: break-all;
`;

const Info = styled.div`
  margin: 3% 3% 0 3%;
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
