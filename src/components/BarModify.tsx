import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { instance } from "../shared/axios";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "..";

export const BarModify = () => {
  const navigate = useNavigate();
  const { barId } = useParams();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  // const [hashTag, setHashTag] = useState<string>("");

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
  // const hashTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     currentTarget: { value },
  //   } = e;
  //   setHashTag(value);
  // };

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

  //input, placeholder 초기값 설정
  const titleData: string = query.isLoading
    ? "loading"
    : `${query.data[0].title}`;
  const addressData: string = query.isLoading
    ? "loading"
    : `${query.data[0].address}`;
  const contentData: string = query.isLoading
    ? "loading"
    : `${query.data[0].review}`;
  useEffect(() => {
    setTitle(titleData);
    setContent(contentData);
    setAddress(addressData);
  }, [titleData, addressData, contentData]);

  //수정하기
  const { mutate: modify } = useMutation(
    "data",
    async (data) => {
      if (title === "") {
        alert("가게 이름을 작성해주세요");
      } else if (address === "") {
        alert("주소를 작성해주세요");
      } else if (content === "") {
        alert("내용를 작성해주세요");
      } else {
        const response = await instance.put(
          `api/mystore/${barId}/modify`,
          data
        );
        navigate("/bar/barlist");
        return response.data;
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("data");
      },
    }
  );

  //data
  // const addPost = async (e: any) => {
  const modifyPost = () => {
    const data: any = {
      title: title,
      address: address,
      review: content,
    };
    modify(data);
  };

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
                modifyPost();
              }}
            >
              수정
            </Save>
          </BarModifyHead>

          <Line />
          <Warning>이미지는 수정이 안됩니다.</Warning>
          <Line />
          <Input
            id="title"
            className="title"
            placeholder={titleData}
            onChange={titleChange}
            value={title ? title : ""}
          />
          <Line />
          <Input
            id="adress"
            className="adress"
            placeholder={addressData}
            onChange={addressChange}
            value={address ? address : ""}
          />
          <Line />
          <textarea
            className="content"
            onChange={contentChange}
            value={content}
            placeholder={contentData}
          ></textarea>
          <Line />
          {/* <HashIconWrap>
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

          <Line /> */}
        </BarModifyWrap>
      </BarModifyContainer>
    </>
  );
};

const BarModifyContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
    cursor: pointer;
  }
`;
const Warning = styled.span`
  font-size: 15px;
  font-weight: bolder;
  color: #7d7b7b;
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
