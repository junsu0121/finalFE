import styled from "styled-components";
import {
  HeartOutlined,
  HeartFilled,
  PlusOutlined,
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "react-query";
import { instance } from "../shared/axios";
import { queryClient } from "..";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

export const BarMyList = () => {
  const navigate = useNavigate();

  //글 삭제 모달창
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //read data
  //read data query
  const query = useQuery(
    "StoreMyList",
    async () => {
      const response = await instance.get("/api/mystore/post/getmystore");
      console.log(response.data.existsStore);
      return response.data.existsStore;
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  //delete data
  //find id
  //query에서 받아온 데이터에서 id 찾기
  //delete data query
  const { mutate: remove } = useMutation(
    "StoreMyList",
    async (id: string) => {
      const response = await instance.delete(`api/mystore/${id}/delete`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("StoreMyList");
        console.log(data);
      },
    }
  );

  return (
    <>
      <Container>
        <AddBtn
          onClick={() => {
            navigate("/barwrite");
          }}
        >
          <div>
            <PlusOutlined />
          </div>
          추가 하기
        </AddBtn>
        {/* {query.isLoading ? (
          <div>is loading</div>
        ) : (
          query.data?.map((v: any) => {
            return (
              <StoreWrap key={v._id}>
                <BarInfoWrap>
                  <ImgWrap>
                    <Img src="" alt="" />
                    <EditOutlined
                      onClick={() => {
                        navigate(`/barmodify/${v._id}`);
                      }}
                      style={{
                        position: "absolute",
                        fontSize: "20px",
                        right: "40px",
                        top: "5px",
                      }}
                    />
                    <DeleteOutlined
                      onClick={() => {
                        setModalIsOpen(true);
                      }}
                      style={{
                        position: "absolute",
                        fontSize: "20px",
                        right: "10px",
                        top: "5px",
                      }}
                    />
                    <Modal
                      style={{
                        overlay: {
                          position: "fixed",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(000,000,000, 0.7)",
                        },
                        content: {
                          height: "20%",
                          width: "90%",
                          position: "fixed",
                          top: "87.5%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          border: "none",
                          overflow: "auto",
                          WebkitOverflowScrolling: "touch",
                          borderRadius: "5px",
                          outline: "none",
                          padding: "20px",
                          background: "none",
                        },
                      }}
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                    >
                      <ModalWrap>
                        <DeleteWrap>
                          <DeleteDesc>이 글을 삭제하시겠습니까?</DeleteDesc>
                          <hr />
                          <DeleteBtn
                            onClick={() => {
                              remove(v._id);
                            }}
                          >
                            삭제
                          </DeleteBtn>
                        </DeleteWrap>
                        <CancelBtn
                          onClick={() => {
                            setModalIsOpen(false);
                          }}
                        >
                          취소
                        </CancelBtn>
                      </ModalWrap>
                    </Modal>
                  </ImgWrap>

                  <BarInfo>
                    <BarName>v.title</BarName>
                    <BarAddress>
                      <EnvironmentOutlined />
                      v.address
                    </BarAddress>
                  </BarInfo>
                </BarInfoWrap>
                <Desc>v.review</Desc>
                <Info>
                  <UserInfo>v.nickname | v.createdAt</UserInfo>
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
        )} */}

        <StoreWrap>
          <BarInfoWrap>
            <ImgWrap>
              <Img src="" alt="" />
              <EditOutlined
                onClick={() => {
                  navigate(`/barmodify/`);
                }}
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  right: "40px",
                  top: "5px",
                }}
              />
              <DeleteOutlined
                onClick={() => {
                  setModalIsOpen(true);
                }}
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  right: "10px",
                  top: "5px",
                }}
              />
              <Modal
                style={{
                  overlay: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(000,000,000, 0.7)",
                  },
                  content: {
                    height: "20%",
                    width: "90%",
                    position: "fixed",
                    top: "87.5%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "none",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "5px",
                    outline: "none",
                    padding: "20px",
                    background: "none",
                  },
                }}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
              >
                <ModalWrap>
                  <DeleteWrap>
                    <DeleteDesc>이 글을 삭제하시겠습니까?</DeleteDesc>
                    <hr />
                    <DeleteBtn onClick={() => {}}>삭제</DeleteBtn>
                  </DeleteWrap>
                  <CancelBtn
                    onClick={() => {
                      setModalIsOpen(false);
                    }}
                  >
                    취소
                  </CancelBtn>
                </ModalWrap>
              </Modal>
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
  width: 340px;
  height: 60px;
  border-radius: 10px;
  background: linear-gradient(to left, #fa0671, #a62dff, #37bfff);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
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
const Div = styled.div`
  height: 100px;
  width: 100%;
`;

const ModalWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const DeleteWrap = styled.div`
  width: 100%;
  height: 55%;
  border-radius: 7px;
  border: none;
  background-color: #292525e4;
  display: flex;
  flex-direction: column;
  align-items: center;
  hr {
    width: 100%;
    height: 1.5%;
    background-color: #333333;
    border: none;
  }
`;

const DeleteDesc = styled.div`
  font-weight: bolder;
  color: #ababab;
  margin-top: 2%;
`;

const DeleteBtn = styled.div`
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 2.5%;
`;

const CancelBtn = styled.button`
  margin-top: 2%;
  width: 100%;
  height: 33%;
  border-radius: 7px;
  border: none;
  background-color: #292525e4;
  color: #3a95ff;
  font-size: 1.2rem;
  font-weight: bold;
`;
