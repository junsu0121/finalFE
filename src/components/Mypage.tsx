import { useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet, useMatch, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
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
import { getCookie } from "../shared/cookie";
import DefaultProfile from "../src_assets/usersm.png";
import { Footer } from "./Footer";

export const Mypage = () => {
  const Nickname = getCookie("nickname");
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;

  const myFaAlcoholMatch = useMatch("/:userId/myfaalcohol");
  const myFaRecipeMatch = useMatch("/:userId/myfarecipe");
  const myFaStoreMatch = useMatch("/:userId/myfastore");

  const [homeActive, setHomeActive] =
    useRecoilState<boolean>(isHomeActiveState);
  const [recipeActive, setRecipeActive] =
    useRecoilState<boolean>(isRecipeActiveState);
  const [libraryActive, setLibraryActive] =
    useRecoilState<boolean>(isLibraryActiveState);
  const [storeActive, setStoreActive] =
    useRecoilState<boolean>(isStoreActiveState);
  const [myActive, setMyActive] = useRecoilState<boolean>(isMyActiveState);

  //로그인 안되었을 경우 로그인 페이지로
  useEffect(() => {
    if (getCookie("token") === undefined) {
      navigate("/");
    }
  }, []);

  // api/user/mypage

  //read data
  //read data query
  const query = useQuery(
    "MyList",
    async () => {
      const response = await instance.get("/api/user/mypage");
      return response.data;
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );
  return (
    <>
      <MypageContainer>
        <MypageWrap>
          <UserInfo>
            <ProfileDiv>
              <img src={DefaultProfile} alt="DefaultProfile" />
            </ProfileDiv>
            <NickNameWrap>
              <NickName>{Nickname}</NickName>
              <Nim>님</Nim>
            </NickNameWrap>
            <Arrow
              onClick={() => {
                navigate(`/mypage/modify/${userId}`);
              }}
            >
              &gt;
            </Arrow>
          </UserInfo>
          <MyPostWrap>
            <MyPost>
              <div>My레시피</div>
              <span
                onClick={() => {
                  setHomeActive(false);
                  setRecipeActive(true);
                  setLibraryActive(false);
                  setStoreActive(false);
                  setMyActive(false);
                  navigate(`/recipe/my`);
                }}
              >
                {query.data?.createdposts}
              </span>
            </MyPost>
            <VHr />
            <MyPost>
              <div>My스토어</div>
              <span
                onClick={() => {
                  setHomeActive(false);
                  setRecipeActive(false);
                  setLibraryActive(false);
                  setStoreActive(true);
                  setMyActive(false);
                  navigate(`/bar/barmylist/${userId}`);
                }}
              >
                {query.data?.createdposts_store}
              </span>
            </MyPost>
          </MyPostWrap>

          <DetailWrap>
            <p>관심 목록</p>
            <CategoryWrap>
              <CategoryTab isActive={myFaAlcoholMatch !== null}>
                <Link to={`/mypage/${userId}/myfaalcohol`}>주류</Link>
              </CategoryTab>
              <CategoryTab isActive={myFaRecipeMatch !== null}>
                <Link to={`/mypage/${userId}/myfarecipe`}>레시피</Link>
              </CategoryTab>
              <CategoryTab isActive={myFaStoreMatch !== null}>
                <Link to={`/mypage/${userId}/myfastore`}>스토어</Link>
              </CategoryTab>
            </CategoryWrap>
            {/* 부모 컴포넌트안에 <Outlet/>으로 원하는 자손 컴포넌트 위치를 정한다. 그리고 context prop으로 자손 컴포넌트에게에게 넘기고 싶은 값을 넣는다. */}
            <Outlet context={{ userId }} />
          </DetailWrap>
        </MypageWrap>
        <Footer />
      </MypageContainer>
    </>
  );
};

const MypageContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;

  @media screen and (min-width: 500px) {
  }
`;

const MypageWrap = styled.div`
  height: 100%;
  margin: 10% 5% 0 5%;
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileDiv = styled.div`
  width: 57px;
  height: 57px;
  background-color: ${(props) => props.theme.divBgColor};
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

const NickNameWrap = styled.div`
  width: 25%;
  display: flex;
  flex-direction: row;
  margin-left: 8%;
`;
const NickName = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const Nim = styled.div`
  font-weight: bolder;
  font-size: 22px;
  margin-left: 3%;
`;

const Arrow = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-left: 45%;
  color: grey;
`;

const MyPostWrap = styled.div`
  margin-top: 15%;
  height: 100px;
  /* background-color: #393b3e; */
  background-color: ${(props) => props.theme.divBgColor};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10%;
`;

const MyPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10% 0 10%;
  div {
    font-weight: bolder;
    color: ${(props) => props.theme.divTextColor};
  }
  span {
    margin-top: 10%;
    font-weight: bold;
    font-size: 20px;
  }
`;

const VHr = styled.hr`
  height: 80px;
  width: 1px;
  border-width: 0;
  color: #393b3e;
  background-color: ${(props) => props.theme.divTextColor};
`;

const DetailWrap = styled.div`
  margin-top: 15%;
  p {
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 10%;
  }
  span {
    font-weight: bold;
  }
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10%;
`;

const CategoryTab = styled.a<{ isActive: boolean }>`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  a {
    position: relative;
    padding-bottom: 2px;
  }

  a:hover:after,
  a:focus::after {
    content: "";
    position: absolute;
    bottom: -20%;
    left: 0;
    height: 2px;
    width: 100%;
    background: #444;
    background: linear-gradient(to left, #fa0671, #a62dff, #37bfff);
  }
`;
