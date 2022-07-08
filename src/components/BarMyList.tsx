import styled from "styled-components";
import {
  HeartOutlined,
  HeartFilled,
  PlusOutlined,
  EnvironmentOutlined,
  EditOutlined,
} from "@ant-design/icons";

export const BarMyList = () => {
  return (
    <>
      <Container>
        <AddBtn>
          <div>
            <PlusOutlined />
          </div>
          추가하기
        </AddBtn>
        <StoreWrap>
          <BarInfoWrap>
            <ImgWrap>
              <Img src="" alt="" />
              <EditOutlined
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  right: "10px",
                  top: "5px",
                }}
              />
            </ImgWrap>

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
        <StoreWrap>
          <BarInfoWrap>
            <ImgWrap>
              <Img src="" alt="" />
              <EditOutlined
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  right: "10px",
                  top: "5px",
                }}
              />
            </ImgWrap>

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
        </StoreWrap>{" "}
        <StoreWrap>
          <BarInfoWrap>
            <ImgWrap>
              <Img src="" alt="" />
              <EditOutlined
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  right: "10px",
                  top: "5px",
                }}
              />
            </ImgWrap>

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

const StoreWrap = styled.div`
  width: 340px;
  height: 240px;
  background-color: ${(props) => props.theme.divBgColor};
  border-radius: 5%;
  margin-bottom: 5%;
`;

const AddBtn = styled.div`
  margin-bottom: 10%;
  height: 60px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.divBgColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  div {
    margin-right: 5px;
  }
`;

const ImgWrap = styled.div`
  width: 100%;
  height: 155px;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  height: 155px;
  border-radius: 5%;
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
