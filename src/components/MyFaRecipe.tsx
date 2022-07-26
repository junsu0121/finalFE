import styled from "styled-components";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useQuery } from "react-query";
import { instance } from "../shared/axios";

export const MyFaRecipe = () => {
  const query = useQuery(
    "MyFaRecipe",
    async () => {
      const response = await instance.get("/api/favorite/getmyrecipe");
      console.log(response.data.getMyrecipe);
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
          query.data.map((v: any) => {
            return (
              <RecipeWrap key={v._id}>
                <Img src="" alt="" />
                <TextWrap>
                  <Title>v.title</Title>
                  <Desc>DescriptionDescriptionDescriptionDescription</Desc>
                  <span></span>
                  <Info>
                    <UserInfo>작성자 | 2022.06.30</UserInfo>
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
                      5
                    </span>
                  </Info>
                </TextWrap>
              </RecipeWrap>
            );
          })
        )}

        <RecipeWrap>
          <Img src="" alt="" />
          <TextWrap>
            <Title>Title</Title>
            <Desc>DescriptionDescriptionDescriptionDescription</Desc>
            <span></span>
            <Info>
              <UserInfo>작성자 | 2022.06.30</UserInfo>
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
                5
              </span>
            </Info>
          </TextWrap>
        </RecipeWrap>
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
  justify-content: center;
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
  margin-left: 5%; ;
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
