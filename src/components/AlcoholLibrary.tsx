import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { instance } from "../shared/axios";
import { useMutation, useQuery } from "react-query";
import {
  Link,
  useMatch,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Footer } from "./Footer";
import { getCookie } from "../shared/cookie";
import axios, { AxiosError } from "axios";
import { queryClient } from "..";
import { SearchOutlined } from "@ant-design/icons";

interface IalcoholIds {
  alcoholIds: string;
}

export const AlcoholLibrary = () => {
  //술 사전 술 목록들 가져오기
  const navigate = useNavigate();
  const params = useParams();
  const { alcoholIds } = useParams<keyof IalcoholIds>() as IalcoholIds;
  const categoryId = params.categoryId;

  const searchMatch = useMatch("/alcoholLibrary/search/:value");
  const vodkaMatch = useMatch("/alcoholLibrary/vodka/:categoryId");
  const ginMatch = useMatch("/alcoholLibrary/gin/:categoryId");
  const rumMatch = useMatch("/alcoholLibrary/rum/:categoryId");
  const tequilaMatch = useMatch("/alcoholLibrary/tequila/:categoryId");
  const liqueurMatch = useMatch("/alcoholLibrary/liqueur/:categoryId");

  const alcoholLibraryIds = useQuery("alcoholLibraryIds", async () => {
    const response = await instance.get("/api/category");
    return response.data;
  });

  useEffect(() => {
    if (getCookie("token") === undefined) {
      navigate("/");
    }
  }, []);

  //검색 기능 구현
  const [value, setValue] = useState("");
  const [gerRecipe, setGetRecipe] = useState<any>();
  const SearchValue = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  // const { mutate: SearchRecipe } = useMutation<any, AxiosError, any, any>(
  //   "SearchRecipe",
  //   async (value) => {
  //     const response = await instance.get(`/api/recipe/list/search/${value}`);
  //     return response.data;
  //   },
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //       queryClient.invalidateQueries("SearchRecipe");
  //     },
  //   }
  // );

  const SearchEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    if (value === "") {
      window.alert("검색어를 입력해주세요.");
      //어케 안넘어가게 하지?
    } else {
      //검색후 빈칸 만들기
      setValue("");
    }
    // SearchRecipe(value);
  };
  useEffect(() => {
    setGetRecipe(gerRecipe);
  }, []);

  return (
    <>
      <Cointainer>
        <Title>Alcohol library</Title>
        <SearchDiv>
          <SearchInput
            onChange={SearchValue}
            placeholder="검색어를 입력해주세요"
          ></SearchInput>
          <SearchBtnWrap isActive={searchMatch !== null}>
            <Link to={`/alcoholLibrary/search/${value}`}>
              <SearchOutlined
                style={{
                  fontSize: "32px",
                  position: "absolute",
                  right: "32px",
                  top: "7px",
                }}
                onClick={SearchEvent}
              />
            </Link>
          </SearchBtnWrap>
        </SearchDiv>
        {alcoholLibraryIds?.isLoading ? (
          ""
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

const Div = styled.div`
  height: 100px;
  width: 100%;
`;
const SearchBtnWrap = styled.a<{ isActive: boolean }>``;

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

const SearchDiv = styled.div`
  position: relative;
  display: flex;
  margin-top: 30%;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  color: white;
  background-color: #46474b;
  width: 335px;
  height: 42px;
  border-radius: 30px;
  border: 1px solid transparent;
`;
