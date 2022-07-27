import React from "react";
import styled from "styled-components";
import { HeartOutlined } from "@ant-design/icons";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { instance } from "../shared/axios";

export const BarList = () => {
  const navigate = useNavigate();
  const searchRef = React.useRef(null);

  const query = useQuery(
    "StoreList",
    async () => {
      const response = await instance.get("/api/mystore/post/list");
      return response.data.mystore;
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
        {/* <SearchBar>
          <Search
            type="text"
            placeholder="# 검색어를 입력해주세요"
            ref={searchRef}
          ></Search>
          <SearchOutlined
            onClick={() => {}}
            style={{
              color: "grey",
              position: "absolute",
              right: "35px",
              fontSize: "25px",
            }}
          />
        </SearchBar> */}
        {query.isLoading ? (
          <div>is loading</div>
        ) : (
          query.data?.map((v: any) => {
            return (
              <StoreWrap
                onClick={() => {
                  navigate(`/bardetail/${v._id}`);
                }}
                key={v._id}
              >
                <BarInfoWrap>
                  <Img src={v.images[0]} alt="" />
                  <BarInfo>
                    <BarName>{v.title}</BarName>
                    <BarAddress>
                      <EnvironmentOutlined />
                      {v.address}
                    </BarAddress>
                  </BarInfo>
                </BarInfoWrap>
                <Desc>{v.review.slice(0, 45)}</Desc>
                <Info>
                  <UserInfo>
                    {v.nickname} | {v.updatedAt.slice(0, 10)}
                  </UserInfo>
                  <span
                    style={{
                      fontSize: "13px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ marginRight: "5px" }}>
                      <HeartOutlined />
                    </div>
                    {v.favorite_count}
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
  height: auto;
  margin: auto;
  display: grid;
  justify-content: center;
  margin-top: 10%;

  @media screen and (min-width: 500px) {
  }
`;
const SearchBar = styled.div`
  margin-bottom: 10%;
  position: relative;
  width: 350px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = styled.input`
  width: 80%;
  height: 100%;
  text-align: left;
  padding: 9px 12px;
  border: none;
  border-radius: 30px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.divBgColor};
  &::placeholder {
    color: ${(props) => props.theme.divTextColor};
  }
`;
const StoreWrap = styled.div`
  width: 340px;
  height: 240px;
  background-color: ${(props) => props.theme.divBgColor};
  border-radius: 5%;
  margin-bottom: 5%;
`;

const Img = styled.img`
  width: 100%;
  height: 155px;
  border-radius: 5%;
  opacity: 0.5;
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
