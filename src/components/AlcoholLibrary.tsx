import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import { useMatch } from "react-router";
import styled from "styled-components";
import { useState } from "react";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const AlcoholLibrary = () => {
  const isDark = useRecoilValue(isDarkAtom);
  //검색기능 구현

  //input 값 가져오기
  const [search, setSearch] = useState("");
  const [lists,setLists] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [currentPosts, setCurrentPosts] = useState([])
  const onChangeSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setSearch(value);
    console.log(value);
  };

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <Cointainer>
        <Title>Alcohol library</Title>

        <SearchBar>
          <SearchForm onSubmit={(event) => onSearch(event)}>
            <SearchInput
              type="text"
              value={search}
              placeholder="# 검색어를 입력해주세요"
              onChange={onChangeSearch}
            />
            <button type="submit">검색</button>
          </SearchForm>
        </SearchBar>
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
  margin-top: 170px;
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
