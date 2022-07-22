import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { NumberOutlined } from "@ant-design/icons";
import { ImCancelCircle } from "react-icons/im";
import { BsFillCameraFill } from "react-icons/bs";
import { instance } from "../shared/axios";
import { useMutation } from "react-query";
import { queryClient } from "..";

interface IModifyData {
  title: string;
  address: string;
  review: string;
}
interface IId {
  id: string;
}

export const BarModify = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.barId;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("");
  const [hashTag, setHashTag] = useState("");

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setTitle(value);
  };
  const addressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setAddress(value);
  };
  const contentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setContent(value);
  };
  const hashTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setHashTag(value);
  };

  //수정하기
  // const { mutate: modify } = useMutation(
  //   "MyStore",
  //   async ({ id, data }) => {
  //     if (title === "") {
  //       alert("가게 이름을 작성해주세요");
  //     } else if (address === "") {
  //       alert("주소를 작성해주세요");
  //     } else if (content === "") {
  //       alert("내용를 작성해주세요");
  //     }else{
  //       const response = await instance.put(`api/mystore/${id}/modify`, data);
  //       return response.data;
  //     }

  //   },
  //   {
  //     onSuccess: (data) => {
  //       queryClient.invalidateQueries("MyStore");
  //       console.log(data);
  //     },
  //   }
  // );

  //   //data
  //   // const addPost = async (e: any) => {
  //   const modifyPost = () => {
  //     const data: any = {
  //       title: title,
  //       address: address,
  //       review: content,
  //     };
  //     console.log(data);
  //     modify(id, data);
  //   };

  return (
    <>
      <BarModifyContainer>
        <BarModifyWrap>
          <BarModifyHead>
            <Cancel
              onClick={() => {
                navigate("/bar/barlist");
              }}
            >
              취소
            </Cancel>
            <Save
              onClick={() => {
                // modifyPost();
              }}
            >
              수정
            </Save>
          </BarModifyHead>

          {/* <Preview>
            {showImages &&
              showImages.map((image, id) => {
                return (
                  <div key={id}>
                    <PreviewImg src={image} />
                    <DeleteImg onClick={() => handleDeleteImage(id)}>
                      x
                    </DeleteImg>
                  </div>
                );
              })}
            {showImages.length === 5 ? null : (
              <label onChange={handleAddImg}>
                <input
                  type="file"
                  id="input-file"
                  multiple
                  style={{
                    display: "none",
                  }}
                />
                <PlusImgBox>
                  <PlusImg>
                    <p>+</p>
                  </PlusImg>
                </PlusImgBox>
              </label>
            )}
          </Preview>
          <PreviewDesc>사진 첨부 (최대 5장)</PreviewDesc> */}

          <Line />
          <Input
            id="title"
            className="title"
            placeholder="글 제목"
            onChange={titleChange}
            value={title ? title : ""}
          />
          <Line />
          <Input
            id="adress"
            className="adress"
            placeholder="주소"
            onChange={addressChange}
            value={address ? address : ""}
          />
          <Line />
          <textarea
            className="content"
            onChange={contentChange}
            value={content}
            placeholder="가게 관련 특징이나 좋았던 점을 적어주세요!"
          ></textarea>
          <Line />
          <HashIconWrap>
            <HashIcon>
              <NumberOutlined style={{ color: "#777777" }} />
            </HashIcon>
            <HashInput
              id="hashtag"
              className="hashtag"
              placeholder="동네이름이나 특징을 해시태그로 달아주세요!"
              onChange={hashTagChange}
              value={hashTag ? hashTag : ""}
            />
          </HashIconWrap>

          <Line />
        </BarModifyWrap>
      </BarModifyContainer>
    </>
  );
};

const BarModifyContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  @media screen and (min-width: 500px) {
  }
`;

const BarModifyWrap = styled.div`
  height: 100%;
  margin: 15% 5% 0 5%;
  textarea {
    width: 100%;
    background-color: transparent;
    margin-bottom: 20px;
    height: 250px;
    padding: 5px;
    border: none;
    color: white;
    :focus {
      outline: none;
    }
  }
`;

const BarModifyHead = styled.div`
  margin: 0% 1%;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 20px;
    font-weight: bolder;
  }
`;

const Cancel = styled.span``;

const Save = styled.span`
  color: #3a95ff;
`;

const Line = styled.hr`
  width: 100%;
  height: 0.2%;
  border: none;
  background-color: #353535;
  margin: 7% 0%;
`;

const Input = styled.input`
  color: ${(props) => props.theme.textColor};
  width: 100%;
  border: none;
  font-size: 15px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const HashInput = styled.input`
  color: ${(props) => props.theme.textColor};
  width: 90%;
  border: none;
  font-size: 15px;
  background-color: transparent;
  padding-left: 7%;
  &:focus {
    outline: none;
  }
`;

const HashIconWrap = styled.div`
  position: relative;
`;

const HashIcon = styled.div`
  position: absolute;
`;
