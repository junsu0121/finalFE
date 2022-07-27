import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import {
  HeartOutlined,
  HeartFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import userImg from "../src_assets/user.png";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import { instance } from "../shared/axios";
import { queryClient } from "..";
import { getCookie } from "../shared/cookie";
import Slider from "react-slick";

export const BarDetail = () => {
  const navigate = useNavigate();
  const { barId } = useParams();

  const [comment, setComment] = useState<string>("");
  // const [modifyComment, setModifyComment] = useState<string>("");
  // const [isModify, setIsModify] = useState<boolean>(false);

  const userId = getCookie("userId");

  //좋아요 기능
  const [heart, setHeart] = useState(false);

  //좋아요 누른사람 조회
  const barLikeData = useQuery<any>(
    "barLikeData",
    async () => {
      const response = await instance.get(`api/favorite/store/${barId}/list`);
      return response.data;
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );
  // 좋아요 상태 체크
  useEffect(() => {
    const userList = [];
    for (let i = 0; i < barLikeData.data?.getUser?.length; i++) {
      userList.push(barLikeData.data.getUser[i].userId);
    }
    if (userList.includes(getCookie("userId"))) {
      setHeart(true);
    } else {
      setHeart(false);
    }
  }, [barLikeData]);

  // 좋아요 추가
  const { mutate: addHeart } = useMutation(
    "barLikeData",
    async () => {
      const response = await instance.post(`api/favorite/store/${barId}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("barLikeData");
      },
    }
  );

  // 좋아요 취소
  const { mutate: removeHeart } = useMutation(
    "barLikeData",
    async () => {
      const response = await instance.delete(
        `api/favorite/store/${barId}/delete`
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("barLikeData");
      },
    }
  );

  // input값 받아오기
  const commentChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setComment(value);
  };

  // const modifyCommentChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   const {
  //     currentTarget: { value },
  //   } = e;
  //   setModifyComment(value);
  // };

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      const data = {
        comment: comment,
      };
      postComment(data);
    }
  };

  // 컨텐츠 디테일 read
  const query = useQuery(
    "data",
    async () => {
      const response = await instance.get(`api/mystore/post/${barId}`);
      return response.data.existsStore;
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  //댓글 read
  const commentQuery = useQuery(
    "comment",
    async () => {
      const response = await instance.get(`api/comment/${barId}/write/list`);
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

  //댓글 modify
  // const sendId = (id: string) => {
  //   const commentId = id;
  //   const data = {
  //     comment: modifyComment,
  //   };
  //   modify({ data, commentId });
  // };
  // //query modify
  // const { mutate: modify } = useMutation<any, AxiosError, any, any>(
  //   "comment",
  //   async ({ data, commentId }) => {
  //     const response = await instance.put(
  //       `api/comment/${barId}/modify/${commentId}`,
  //       data
  //     );
  //     setIsModify(false);
  //     setModifyComment("");
  //     return response.data;
  //   },
  //   {
  //     onSuccess: (data) => {
  //       queryClient.invalidateQueries("comment");
  //       console.log(data);
  //     },
  //   }
  // );

  //slick settings
  const settings = {
    dots: true, // 점 보이게
    infinite: false, // 무한으로 즐기게
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <BarDetailContainer>
        {/* <DDabongDiv>
          {barLikeData ? (
            <HeartFilled
              style={{ fontSize: "30px" }}
              onClick={unclickHeart}
            ></HeartFilled>
          ) : (
            <HeartOutlined
              style={{ fontSize: "30px" }}
              onClick={clickHeart}
            ></HeartOutlined>
          )}
        </DDabongDiv> */}
        <ImgBox>
          <StyledSlider {...settings}>
            {query.isLoading ? (
              <div>is loading</div>
            ) : (
              query?.data[0].images.map((v: any, i: number) => {
                return (
                  <>
                    <ImgCard key={i}>
                      <MainImg src={v} />
                    </ImgCard>
                  </>
                );
              })
            )}
          </StyledSlider>
        </ImgBox>
        <BarDetailHead>
          <Entity
            onClick={() => {
              navigate("/bar/barlist");
            }}
          >
            &lt;
          </Entity>
          <HeartWrap>
            {!heart ? (
              <HeartOutlined
                onClick={() => {
                  addHeart();
                }}
              />
            ) : (
              <HeartFilled
                onClick={() => {
                  removeHeart();
                }}
              />
            )}
          </HeartWrap>
        </BarDetailHead>
        <BarDetailWrap>
          {query.isLoading ? (
            <div>is loading</div>
          ) : (
            query.data?.map((v: any) => {
              return (
                <div key={v._id}>
                  <TitleWrap>
                    <h1>{v.title}</h1>
                    <div>
                      <EnvironmentOutlined />
                      <span>{v.address}</span>
                    </div>
                  </TitleWrap>
                  <DetailWrap>
                    <Desc>{v.review}</Desc>
                  </DetailWrap>
                  <UserInfo>
                    {v.nickname} | {v.createdAt.slice(0, 10)}
                  </UserInfo>
                </div>
              );
            })
          )}

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
                <div key={v._id}>
                  <CommentList>
                    <UsersmImg src={userImg} alt="" />
                    <UserComment>
                      <div>{v.nickname}</div>
                      <div>{v.comment}</div>
                    </UserComment>
                    {userId === v.userId && (
                      <CommentModify>
                        {/* <div
                          onClick={() => {
                            setIsModify(true);
                          }}
                        >
                          수정
                        </div> */}
                        <div
                          onClick={() => {
                            remove(v._id);
                          }}
                        >
                          삭제
                        </div>
                      </CommentModify>
                    )}
                  </CommentList>
                  {/* {isModify && (
                    <div>
                      <ModifyInput
                        placeholder="댓글 수정..."
                        id="modifycomment"
                        className="modifycomment"
                        onChange={modifyCommentChange}
                        value={modifyComment ? modifyComment : ""}
                      ></ModifyInput>
                      <button
                        onClick={() => {
                          sendId(v._id);
                        }}
                      >
                        수정하기
                      </button>
                    </div>
                  )} */}
                </div>
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
  @media screen and (min-width: 500px) {
  }
`;
const ImgBox = styled.div`
  width: 390px;
  height: 360px;
  display: flex;
  /* overflow: auto;
  scroll-snap-type: x mandatory; */
`;
const ImgCard = styled.div`
  flex: none;
  /* scroll-snap-align: start; */
  width: 100%;
  height: 100%;
  /* background-color: red; */
`;

const MainImg = styled.img`
  /* padding: 10px; */
  width: 100%;
  display: block;
  height: 370px;
`;
const BarDetailWrap = styled.div`
  height: 100%;
  margin: 15% 5% 0 5%;
  position: relative;
`;

const BarDetailHead = styled.div`
  margin: 0% 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 5%;
  right: 5%;
`;

const Entity = styled.div`
  font-size: 30px;
  font-weight: bolder;
  top: 4%;
  mix-blend-mode: difference;
`;

const HeartWrap = styled.div`
  margin-left: 300px;
  font-size: 20px;
  mix-blend-mode: difference;
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

// const ModifyInput = styled.input`
//   margin-bottom: 7%;
//   color: ${(props) => props.theme.textColor};
//   width: 98%;
//   border: 0 0 1px 0;
//   border-bottom: 1px;
//   font-size: 15px;
//   background-color: transparent;
//   &:focus {
//     outline: none;
//   }
// `;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;

  .slick-prev {
    left: 20px !important;
    z-index: 1000;
    /* background-color: transparent; */
  }

  .slick-next {
    right: 20px !important;
    z-index: 1000;
    /* background-color: black; */
  }

  .slick-dots {
    display: flex;
    width: 100px;
    margin: 0;
    padding: 0;
    left: 50%;
    bottom: -40px;
    transform: translate(-50%, -50%);
  }

  .slick-dots li {
    width: 6px;
    height: 6px;
    margin: 0 3.5px;
  }

  .slick-dots li button {
    width: 6px;
    height: 6px;
  }

  .slick-dots li button:before {
    width: 6px;
    height: 6px;
    color: white;
  }

  .slick-dots li.slick-active button:before {
    color: white !important;
  }

  li {
    margin: 0;
    padding: 0;
  }
`;
