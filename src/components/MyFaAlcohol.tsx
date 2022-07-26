import { useQuery } from "react-query";
import styled from "styled-components";
import { instance } from "../shared/axios";

export const MyFaAlcohol = () => {
  const query = useQuery(
    "MyFaAlcohol",
    async () => {
      const response = await instance.get("/api/favorite/drink/getdrinks");
      console.log(response.data.getMydrink);
      return response.data.getMydrink;
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
              <AlcoholWrap key={v.id}>
                <Img src="" alt="" />
                <Title>v.title</Title>
                <EnTitle>v.EnTitle</EnTitle>
              </AlcoholWrap>
            );
          })
        )}
        <AlcoholWrap>
          <Img src="" alt="" />
          <Title>Title</Title>
          <EnTitle>EnTitle</EnTitle>
        </AlcoholWrap>
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
  grid-template-columns: 55% 50%;
  grid-template-rows: 38% 38%;
  justify-content: space-between;
  @media screen and (min-width: 500px) {
  }
`;
const AlcoholWrap = styled.div`
  border-radius: 3%;
  width: 158px;
  height: 243px;
  background-color: ${(props) => props.theme.divBgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 122px;
  height: 162px;
`;

const Title = styled.div`
  margin: 5% 0 3% 0;
  font-weight: bold;
`;
const EnTitle = styled.div`
  font-size: 15px;
  font-weight: bolder;
`;

const Div = styled.div`
  height: 150px;
  width: 100%;
`;
