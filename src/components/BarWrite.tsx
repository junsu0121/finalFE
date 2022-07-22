import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { NumberOutlined } from "@ant-design/icons";

import { instance } from "../shared/axios";
import { useMutation } from "react-query";
import { queryClient } from "..";

interface IPostData {
  image: string[];
  title: string;
  address: string;
  review: string;
}

export const BarWrite = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("");
  const [hashTag, setHashTag] = useState("");
  const [preview, setPreview] = useState(null);

  const [showImages, setShowImages] = useState([]);
  const [getImages, setGetImages] = useState([]);

  //포스팅하기
  const { mutate } = useMutation(
    "MyStore",
    async (data) => {
      const response = await instance.post("/api/mystore/post", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("MyStore");
        console.log(data);
      },
    }
  );

  // 이미지 미리보기 기능 구현
  const handleAddImg = (e: any) => {
    // console.log(e.target.files, "img")
    const imageLists = e.target.files;

    let imageUrlLists: any = [...showImages];

    let getImagesLists = [...getImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImgUrl = URL.createObjectURL(imageLists[i]);
      // console.log(currentImgUrl, "url")
      imageUrlLists.push(currentImgUrl);
      getImagesLists.push(imageLists[i]);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists(0, 5);
    }

    setShowImages(imageUrlLists);

    setGetImages(getImagesLists);
  };

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

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    setGetImages(getImages.filter((_, index) => index !== id));
  };

  //data
  // const addPost = async (e: any) => {
  const addPost: () => Promise<void> = async () => {
    for (let i = 0; i < showImages.length; i++) {
      window.URL.revokeObjectURL(showImages[i]);
    }
    console.log(getImages);
    let img = getImages;
    const formData = new FormData();
    for (let i = 0; i < img.length; i++) {
      //  console.log(img[i])
      formData.append("file", img[i]);
      // files.push(img[i])
    }
    const response = await instance.post("", formData);
    console.log(response.data);
    const data: any = {
      image: response.data,
      title: title,
      address: address,
      review: content,
    };
    console.log(data);

    mutate(data);
  };

  return (
    <>
      <BarWriteContainer>
        <BarWriteWrap>
          <BarWriteHead>
            <Cancel
              onClick={() => {
                navigate("/bar/barlist");
              }}
            >
              취소
            </Cancel>
            <Save
              onClick={() => {
                addPost();
              }}
            >
              저장
            </Save>
          </BarWriteHead>

          <Preview>
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
          <PreviewDesc>사진 첨부 (최대 5장)</PreviewDesc>

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
        </BarWriteWrap>
      </BarWriteContainer>
    </>
  );
};

const BarWriteContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  @media screen and (min-width: 500px) {
  }
`;

const BarWriteWrap = styled.div`
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

const BarWriteHead = styled.div`
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

const Preview = styled.div`
  width: 100%;
  height: 10%;
  justify-content: center;
  display: flex;
`;

const PreviewImg = styled.img`
  width: 68px;
  height: 70%;
  border-radius: 5px;
  margin-top: 10px;
`;

const PlusImgBox = styled.div`
  display: flex;
  justify-content: center;
  width: 68px;
  margin-top: 11px;
  /* background-color: aqua; */
`;

const PlusImg = styled.div`
  border: 2px solid #fff;
  opacity: 0.3;
  width: 25px;
  height: 25px;
  margin-top: 20px;
  border-radius: 20px;
  padding: 2px;
  text-align: center;

  p {
    font-weight: bold;
    font-size: 25px;
    margin: auto;
  }
`;

const DeleteImg = styled.button`
  background-color: transparent;
  color: gray;
  left: 2px;
`;

const PreviewDesc = styled.p`
  margin-top: 5%;
  font-size: 10px;
`;
