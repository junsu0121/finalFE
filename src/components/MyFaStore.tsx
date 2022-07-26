import styled from "styled-components";
import {
  HeartOutlined,
  HeartFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useQuery } from "react-query";
import { instance } from "../shared/axios";

export const MyFaStore = () => {
  const query = useQuery(
    "MyFaStore",
    async () => {
      const response = await instance.get("/api/favorite/store/getmystore");
      console.log(response.data.getMystore);
      return response.data.getMystore;
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
              <StoreWrap key={v.id}>
                <BarInfoWrap>
                  <Img src="" alt="" />
                  <BarInfo>
                    <BarName>v.title</BarName>
                    <BarAddress>
                      <EnvironmentOutlined />
                      v.address
                    </BarAddress>
                  </BarInfo>
                </BarInfoWrap>
                <Desc>
                  DescriptionDescriptionDescriptionDescriptionDescription
                </Desc>
                <Info>
                  <UserInfo>v.nickname | 2022.06.30</UserInfo>
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
              </StoreWrap>
            );
          })
        )}
        <StoreWrap>
          <BarInfoWrap>
            <Img src="" alt="" />
            <BarInfo>
              <BarName>Bar Name</BarName>
              <BarAddress>
                <EnvironmentOutlined />
                Bar adress
              </BarAddress>
            </BarInfo>
          </BarInfoWrap>
          <Desc>DescriptionDescriptionDescriptionDescriptionDescription</Desc>
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
        </StoreWrap>
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
