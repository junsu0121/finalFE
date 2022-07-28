import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { useState } from "react";
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
  const alcoholId = params.alcoholId;

  const { isLoading, data } = useQuery<Icategory[]>(
    "categoryId",
    alcoholCategory
  );

  const dataId = data && data.map((x) => x._id);

  const categoryMatch = useMatch(`/alcoholLibrary/${dataId}`);
  console.log(categoryMatch);
  // console.log(categoryMatch);

  return (
    <>
      <Cointainer>
        <Title>Alcohol library</Title>
        {isLoading ? (
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
        )}
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

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 20px;
  float: left;
  margin: 5% 0px 0px 0px;
  padding-left: 3%;
`;

const SearchBar = styled.div`
  position: absolute;
  text-align: center;
  padding: 7px 0px;
  margin-top: 70px;
`;

const SearchForm = styled.form`
  width: 100%;
  margin-left: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  height: 30px;
  border: transparent;
  border-radius: 20px;
  background-color: ${(props) => props.theme.searchBarColor};
  color: ${(props) => props.theme.textColor};
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

/* a:hover::after {
    content: "";
    position: absolute;
    bottom: -20%;
    left: 0;
    height: 2px;
    width: 100%;
    background: #444;
    background: linear-gradient(to left, #fa0671, #a62dff, #37bfff);
  } */
// `;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Div = styled.div`
  height: 100px;
  width: 100%;
`;
