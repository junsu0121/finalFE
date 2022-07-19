import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { myrecipe_Myrecipe } from "../shared/api";
import { useNavigate, useParams } from "react-router";
import { HeartOutlined } from "@ant-design/icons";
import { Footer } from "./Footer";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?

interface Iingredient {}

interface IuserId {
  userId: string;
}

interface ImyrecipeList_Myrecipe {
  _id: string;
  __v: number;
  userId: string;
  updatedAt: string;
  title: string;
  nickname: string;
  ingredients: any;
  image: string;
  createdAt: string;
  brief_description: string;
}

export const Recipe_My = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const params = useParams<keyof IuserId>();
  const navigate = useNavigate();
  const userId = params.userId;
  const {
    isLoading: myrecipeList_MyrecipeLoading,
    data: myrecipeList_MyrecipeData,
  } = useQuery<any>("myrecipeListss", () => myrecipe_Myrecipe);
  console.log(myrecipeList_MyrecipeData);
  return (
    <Cointainer>
      <PlusBtn
        onClick={() => {
          navigate(`/myrecipeWrite`);
        }}
      >
        {" "}
        <PlusOutlined /> &nbsp; 추가하기
      </PlusBtn>

      {/* <RecipeList>
        <PlusCard>
          <PlusOutlined /> &nbsp; 추가하기
        </PlusCard>
      </RecipeList>
      {myrecipeList_MyrecipeLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {myrecipeList_MyrecipeData?.map((x) => (
            <RecipeWrap>
              <Img src={x.image} alt="" />
              <TextWrap>
                <Title>{x.title}</Title>
                <Desc>DescriptionDescriptionDescriptionDescription</Desc>
                <span></span>
                <Info>
                  <UserInfo>
                    {x.nickname} | {x.createdAt}
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
                    {x.ingredients.length}
                  </span>
                </Info>
              </TextWrap>
            </RecipeWrap>
          ))}
        </>
      )} */}
      <Footer />
    </Cointainer>
  );
};

const Cointainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  text-align: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const RecipeList = styled.div`
  /* background-color: red; */
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  margin: auto;
  width: 100%;
  height: 100px;
  border: solid 1px ${(props) => props.theme.bgColor};
  border-radius: 5px;
`;
const PlusCard = styled.div`
  display: flex;
  justify-content: center;
  width: 95%;
  height: 50%;
  margin: auto;
  padding: auto;
  /* border: 1px solid ${(props) => props.theme.bggrColor}; */
  border-radius: 10px;
  align-items: center;

  /* padding: 10px; */

  background-color: ${(props) => props.theme.recipebgColor};
  color: "#A7A7A7";
  cursor: pointer;

  /* :hover {
    box-shadow: ${(props) => props.theme.hoverColor} 0px 5px 15px 5px;
  } */
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

const PlusBtn = styled.button`
  width: 95%;
  margin: 5% 0 5% 0;
  height: 50px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(to left, #fa0671, #a62dff, #37bfff);
  color: white;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;
