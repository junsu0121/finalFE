import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";

import { useMutation, useQuery } from "react-query";
import { myrecipe_Myrecipe } from "../shared/api";
import { useNavigate, useParams } from "react-router";
import {
  HeartOutlined,
  PlusOutlined,
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Footer } from "./Footer";
import { instance } from "../shared/axios";
import { queryClient } from "..";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?

interface Iingredient {}

interface IuserId {
  userId: string;
}

interface ImyList {
  MyrecipeId: string;
  brief_description: string;
  createdAt: string;
  favorite_count: number;
  id: string;
  image: string;
  ingredients: string[];
  key: string;
  nickname: string;
  steps: string[];
  title: string;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
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

  const myList = useQuery<ImyList[]>(
    "MyList",
    async () => {
      const response = await instance.get("/api/myrecipe/post/getmyrecipe");
      return response.data.Myrecipe;
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );
  console.log(myList.data);

  // 삭제
  const { mutate: remove } = useMutation(
    "MyList",
    async (id: string) => {
      const response = await instance.delete(`/api/myrecipe/${id}/delete`);

      navigate("/recipe/my");
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("MyList");
      },
    }
  );
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
      {myList.isLoading ? (
        <div>is loading</div>
      ) : (
        myList.data.map((x) => {
          return (
            <RecipeWrap
              key={x._id}
              onClick={() => {
                navigate(`/recipe/search/${x._id}`);
              }}
            >
              <Img src={x.image} alt="" />
              <EditOutlined
                onClick={() => {
                  navigate(`/RecipeModify/${x._id}`);
                }}
                style={{
                  position: "relative",
                  fontSize: "20px",
                  left: "150px",
                  bottom: "60px",
                  cursor: "pointer",
                }}
              />
              <DeleteOutlined
                onClick={() => {
                  remove(x._id);
                }}
                style={{
                  position: "relative",
                  fontSize: "20px",
                  left: "170px",
                  bottom: "60px",
                  cursor: "pointer",
                }}
              />
              <TextWrap>
                <Title>{x.title}</Title>
                <Desc>{x.brief_description}</Desc>
                <span></span>
                <Info>
                  <UserInfo>
                    {x.nickname} | {x.createdAt.slice(0, 10)}
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
                    {x.favorite_count}
                  </span>
                </Info>
              </TextWrap>
            </RecipeWrap>
          );
        })
      )}

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
const RecipeWrap = styled.div`
  margin-left: 4%;
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
  cursor: pointer;
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
