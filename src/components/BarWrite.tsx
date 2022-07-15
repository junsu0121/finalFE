import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { NumberOutlined } from "@ant-design/icons";

export const BarWrite = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [address, setAddress] = useState(null);
  const [hashTag, setHashTag] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prevImage, setPrevImage] = useState(null);
  const [image, setImage] = useState([]);
  // 이미지 미리보기 기능 구현
  // const uploadImage = (e) => {
  //   let imagelist = [];
  //   let filelist = [];
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     console.log(e.target.files[i]);
  //     filelist[i] = e.target.files[i];
  //     let reader = new FileReader(); // 이미지 미리보기!!!
  //     reader.readAsDataURL(e.target.files[i]);
  //     reader.onload = () => {
  //       imagelist[i] = reader.result;
  //       setPreview([...preview, ...imagelist]);
  //     };
  //   }
  //   setImage([...image, ...filelist]);
  //   e.target.value = "";
  // };

  const titleChange = (e: any) => {
    setTitle(e.target.value);
  };
  const addressChange = (e: any) => {
    setAddress(e.target.value);
  };
  const contentChange = (e: any) => {
    setContent(e.target.value);
  };
  const hashTagChange = (e: any) => {
    setHashTag(e.target.value);
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
            <Save>저장</Save>
          </BarWriteHead>
          <ImgUploadWrap></ImgUploadWrap>
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

const ImgUploadWrap = styled.div``;

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
