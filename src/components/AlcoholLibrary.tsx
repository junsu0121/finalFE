import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { instance } from "../shared/axios";
import { useQuery } from "react-query";
import {
  Link,
  useMatch,
  useLocation,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import { alcoholCategory } from "../shared/api";
import { Footer } from "./Footer";
import { getCookie } from "../shared/cookie";
//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?

interface Icategory {
  _id: string;
  __v: number;
  title: string;
  image: string;
  description: string;
}

interface IalcoholIds {
  alcoholIds: string;
}

export const AlcoholLibrary = () => {
  const isDark = useRecoilValue(isDarkAtom);
  //검색기능 구현

  //input 값 가져오기
  const [search, setSearch] = useState("");
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const onChangeSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setSearch(value);
  };

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  //술 사전 술 목록들 가져오기
  const navigate = useNavigate();
  const params = useParams();
  const { alcoholIds } = useParams<keyof IalcoholIds>() as IalcoholIds;
  const categoryId = params.categoryId;

  const vodkaMatch = useMatch("/alcoholLibrary/vodka/:categoryId");
  const ginMatch = useMatch("/alcoholLibrary/gin/:categoryId");
  const rumMatch = useMatch("/alcoholLibrary/rum/:categoryId");
  const tequilaMatch = useMatch("/alcoholLibrary/tequila/:categoryId");
  const liqueurMatch = useMatch("/alcoholLibrary/liqueur/:categoryId");

  // 주류 카테고리 목록
  // export async function alcoholCategory() {
  //   return await instance
  //     .get("/api/category")
  //     .then((response) => response.data.drinkCategories);
  // }
  // const { isLoading, data } = useQuery<Icategory[]>(
  //   "categoryId",
  //   alcoholCategory
  // );

  const alcoholLibraryIds = useQuery("alcoholLibraryIds", async () => {
    const response = await instance.get("/api/category");
    return response.data;
  });
  // console.log(alcoholLibraryIds.data.drinkCategories[0]._id);

  useEffect(() => {
    if (getCookie("token") === undefined) {
      navigate("/");
    }
  }, []);

  // useEffect(() => {
  //   document.getElementById("barListBtn").focus();
  // }, []);

  return (
    <>
      <Cointainer>
        <Title>Alcohol library</Title>
        {alcoholLibraryIds?.isLoading ? (
          <div>is loading</div>
        ) : (
          <>
            <TabWrap>
              <CategoryWrap>
                <CategoryTab isActive={vodkaMatch !== null}>
                  <Link
                    id="barListBtn"
                    to={`/alcoholLibrary/vodka/${alcoholLibraryIds.data.drinkCategories[0]._id}`}
                  >
                    VODKA{" "}
                  </Link>
                </CategoryTab>
                <CategoryTab isActive={ginMatch !== null}>
                  <Link
                    to={`/alcoholLibrary/gin/${alcoholLibraryIds.data.drinkCategories[1]._id}`}
                  >
                    GIN
                  </Link>
                </CategoryTab>

                <CategoryTab isActive={rumMatch !== null}>
                  <Link
                    to={`/alcoholLibrary/rum/${alcoholLibraryIds.data.drinkCategories[2]._id}`}
                  >
                    RUM
                  </Link>
                </CategoryTab>
                <CategoryTab isActive={tequilaMatch !== null}>
                  <Link
                    to={`/alcoholLibrary/tequila/${alcoholLibraryIds.data.drinkCategories[3]._id}`}
                  >
                    TRQUILA
                  </Link>
                </CategoryTab>
                <CategoryTab isActive={liqueurMatch !== null}>
                  <Link
                    to={`/alcoholLibrary/liqueur/${alcoholLibraryIds.data.drinkCategories[4]._id}`}
                  >
                    LIQUEUR
                  </Link>
                </CategoryTab>
              </CategoryWrap>
            </TabWrap>
            <Outlet context={{ categoryId }} />
          </>
        )}
        {/* {isLoading ? (
          <Loader>"Loading..."</Loader>
        ) : (
          <>
            <TabWrap>
              {data?.map((x) => (
                <Tabs key={x._id}>
                  <Link to={`/alcoholLibrary/${x._id}`}>
                    <Tab isActive={categoryMatch !== null}>{x.title}</Tab>
                  </Link>
                </Tabs>
              ))}
            </TabWrap>
         
            <Outlet context={alcoholId} />
          </>
        )} */}
        <Div></Div>
        <Footer />
      </Cointainer>
    </>
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

const Title = styled.p`
  font-weight: bold;
  font-size: 28px;
  float: left;
  margin: 6% 0px 0px 0px;
  padding-left: 3%;
  padding-top: 3%;
`;

const TabWrap = styled.div`
  width: 90%;

  display: flex;
  justify-content: center;
  margin: auto;
  padding-top: 15%;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  margin: auto;
  gap: 10px;
`;

const Tab = styled.a<{ isActive: boolean }>`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  a {
    position: relative;
    padding-bottom: 2px;
    text-decoration: none;
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

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Div = styled.div`
  height: 100px;
  width: 100%;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10%;
`;

const CategoryTab = styled.a<{ isActive: boolean }>`
  margin: 10px;
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
