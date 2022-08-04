import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { getCookie } from "../shared/cookie";
import { useEffect } from "react";
import { instance } from "../shared/axios";
import { HeartOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { queryClient } from "..";

export const AlcoholLibrarySearch = () => {
  const navigate = useNavigate();
  const { value } = useParams();
  const searchData = value;

  const query = useQuery(
    ["SearchRecipe", searchData],
    async () => {
      const response = await instance.get(
        `/api/recipe/list/search/${searchData}`
      );
      console.log(response.data.newfindAllRecipes);
      return response.data.newfindAllRecipes;
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    if (getCookie("token") === undefined) {
      navigate("/");
    }
  }, []);
  return (
    <Cointainer>
      {query.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {query.data?.map((x: any) => (
            <RecipeWrap
              key={x._id}
              onClick={() => {
                navigate(`/ourRecipe/${x._id}`);
              }}
            >
              <Img src={x.image} alt="" />
              <TextWrap>
                <Title>{x.title}</Title>
                <Desc>
                  {x.brief_description.length < 15
                    ? x.brief_description
                    : x.brief_description.slice(0, 15) + "..."}
                </Desc>
                <span></span>
                <Info>
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
                    {x.recommends}
                  </span>
                </Info>
              </TextWrap>
            </RecipeWrap>
          ))}
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
  /* overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none; */

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const RecipeWrap = styled.div`
  margin: 5% auto;
  width: 335px;
  height: 132px;
  background-color: ${(props) => props.theme.divBgColor};
  border-radius: 3%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Img = styled.img`
  object-fit: cover;
  width: 120px;
  height: 108px;
  overflow: hidden;

  border-radius: 3%;
`;
const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%; ;
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
const Desc = styled.div`
  width: 220px;
  font-weight: bolder;
  margin: 5% 0 5% 0;
  word-break: break-all;
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Div = styled.div`
  height: 100px;
  width: 100%;
`;
