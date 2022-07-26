import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import {
  HeartOutlined,
  HeartFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import userImg from "../src_assets/user.png";
import CardSlide from "./CardSlide";
import { MutationCache, useMutation, useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { instance } from "../shared/axios";
import { queryClient } from "..";

export const BarDetail = () => {
  const navigate = useNavigate();
  const { barId } = useParams();

  const [comment, setComment] = useState<string>("");

  const commentChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setComment(value);
  };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      const data = {
        comment: comment,
      };
      postComment(data);
    }
  };

  // 컨텐츠 디테일 read
  // const query = useQuery(
  //   "data",
  //   async () => {
  //     const response = await axios.get("http://localhost:5001/test");
  //     return response.data;
  //   },
  //   {
  //     onError: (err) => {
  //       console.log(err);
  //     }
  //   }
  // );

  //댓글 read
  const commentQuery = useQuery(
    "comment",
    async () => {
      console.log(barId);
      const response = await instance.get(`api/comment/${barId}/write/list`);
      console.log(response.data.getAllcomment);
      return response.data.getAllcomment;
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  //댓글 create
  const { mutate: postComment } = useMutation<any, AxiosError, any, any>(
    "comment",
    async (data) => {
      const response = await instance.post(`api/comment/${barId}/write`, data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("comment");
        setComment("");
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error(error);
      },
    }
  );

  //댓글 delete
  const { mutate: remove } = useMutation(
    "comment",
    async (id: string) => {
      console.log(id);
      const response = await instance.delete(
        `api/comment/${barId}/delete/${id}`
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("comment");
        console.log(data);
      },
    }
  );

  return (
    <>
      <BarDetailContainer>
        <ImgBox>
          {/* {data?.img.map((v, i) => {
            return (
              <ImgCard key={v.id}>
                <MainImg src={v.url} />
              </ImgCard>
            );
          })} */}
        </ImgBox>
        <BarDetailWrap>
          <BarDetailHead>
            <Entity
              onClick={() => {
                navigate("/bar/barlist");
              }}
            >
              &lt;
            </Entity>
            <HeartWrap>
              <HeartOutlined />
            </HeartWrap>
          </BarDetailHead>
          <TitleWrap>
            <h1>더 로열푸드 앤 드링크</h1>
            <div>
              <EnvironmentOutlined />
              <span>서울 용산구 신흥로 20길 37</span>
            </div>
          </TitleWrap>
          <DetailWrap>
            <Desc>
              DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription
            </Desc>
          </DetailWrap>
          <UserInfo>작성자 | 2022.06.30</UserInfo>
          <Line />
          <CommentTitle>댓글</CommentTitle>
          <InputWrap>
            <UserImg src={userImg} alt="" />
            <Input
              id="comment"
              className="comment"
              placeholder="댓글 추가..."
              onChange={commentChange}
              onKeyPress={onKeyPress}
              value={comment ? comment : ""}
            />
          </InputWrap>
          <Line />
          {commentQuery.isLoading ? (
            <div>is loading</div>
          ) : (
            commentQuery.data?.map((v: any) => {
              return (
                <CommentList key={v._id}>
                  <UsersmImg src={userImg} alt="" />
                  <UserComment>
                    <div>{v.nickname}</div>
                    <div>{v.comment}</div>
                  </UserComment>
                  <CommentModify>
                    <div>수정</div>
                    <div
                      onClick={() => {
                        remove(v._id);
                      }}
                    >
                      삭제
                    </div>
                  </CommentModify>
                </CommentList>
              );
            })
          )}
        </BarDetailWrap>
      </BarDetailContainer>
    </>
  );
};

const BarDetailContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  position: relative;
  @media screen and (min-width: 500px) {
  }
`;
const ImgBox = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  overflow: auto;
  scroll-snap-type: x mandatory;
`;
const ImgCard = styled.div`
  flex: none;
  scroll-snap-align: start;
  width: 100%;
  height: 98%;
`;

const MainImg = styled.img`
  padding: 10px;
  width: 90%;
  display: block;
  height: 90%;
`;
const BarDetailWrap = styled.div`
  height: 100%;
  margin: 15% 5% 0 5%;
`;

const BarDetailHead = styled.div`
  margin: 0% 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 5%;
`;

const Entity = styled.div`
  font-size: 30px;
  font-weight: bolder;
  top: 4%;
  color: grey;
`;

const HeartWrap = styled.div`
  margin-left: 300px;
  font-size: 20px;
`;

const TitleWrap = styled.div`
  h1 {
    font-weight: bold;
    font-size: 1.5rem;
  }
  div {
    margin-top: 3%;
    font-weight: bolder;
    color: #bdbdbd;
    span {
      margin-left: 2%;
    }
  }
`;

const DetailWrap = styled.div`
  margin: 10% 0%;
`;

const Desc = styled.div`
  color: #bdbdbd;
  margin: 3% 3% 0 3%;
  word-break: break-all;
  font-weight: bolder;
`;

const UserInfo = styled.div`
  font-size: 13px;
  color: #bdbdbd;
  float: right;
  margin-bottom: 10%;
`;

const Line = styled.hr`
  width: 100%;
  height: 0.2%;
  border: none;
  background-color: #353535;
  margin: 7% 0%;
`;

const CommentTitle = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 7%;
`;
const InputWrap = styled.div`
  position: relative;
`;

const UserImg = styled.img`
  position: absolute;
  top: -10px;
  width: 42px;
  height: 42px;
`;

const Input = styled.input`
  color: ${(props) => props.theme.textColor};
  width: 90%;
  border: none;
  font-size: 15px;
  padding-left: 15%;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const CommentList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7%;
  position: relative;
`;

const UsersmImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5%;
`;

const UserComment = styled.div`
  display: flex;
  flex-direction: column;
  div {
    font-weight: bolder;
    word-break: break-all;
  }
`;

const CommentModify = styled.div`
  display: flex;
  position: absolute;
  div {
    font-size: 12px;
    font-weight: bold;
    margin-right: 5px;
  }
  right: 1px;
  top: 1px;
`;
