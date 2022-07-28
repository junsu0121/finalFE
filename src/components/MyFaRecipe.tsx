import styled from "styled-components";
import { HeartOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { instance } from "../shared/axios";
import { useNavigate } from "react-router";

export const MyFaRecipe = () => {
  const navigate = useNavigate();
  const query = useQuery(
    "MyFaRecipe",
    async () => {
      const response = await instance.get("/api/favorite/getmyrecipe");
      return response.data.getMyrecipe;
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
                  navigate(`/recipe/search/${v.Myrecipe[0]._id}`);
                }}
              >
                <Img src={v.Myrecipe[0].image} alt="" />
                <TextWrap>
                  <Title>{v.Myrecipe[0].title}</Title>
                  <Desc>{v.Myrecipe[0].brief_description}</Desc>
                  <span></span>
                  <Info>
                    <UserInfo>
                      {v.Myrecipe[0].nickname} |{" "}
                      {v.Myrecipe[0].createdAt.slice(0, 10)}
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
                      {v.Myrecipe[0].favorite_count}
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
