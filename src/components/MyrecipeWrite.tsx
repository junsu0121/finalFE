import React, { useState } from "react";
import styled from "styled-components";

export const MyrecipeWrite = () => {
  //칵테일명 input 값 가져오기
  const [cocktail, setCocktail] = useState("");
  const onCocktailChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCocktail(value);
  };

  //작성자명 input 값 가져오기
  const [userName, setUserName] = useState("");
  const onUserNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUserName(value);
  };
  console.log(cocktail, "칵테일명", userName, "유저이름");

  // 코멘트 input 값 가져오기
  const [comment, setComment] = useState("");

  const onCommentChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setComment(value);
  };

  // 이미지 업로드 및 미리보기 구현
  const [preview, setPreview] = useState(null);

  const [file, setFile] = useState<FileList | undefined>();
  const [fileName, setFileName] =
    useState<string>("이미지 파일을 업로드 해주세요");

  const imageSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList != null) {
      setFile(fileList);
      setFileName(fileList[0].name);
      console.log(fileList);
      let reader = new FileReader(); // 이미지 미리보기!!!
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(file).forEach((f) => formData.append("image", f));
  };

  // 카테고리 및 선택 해제 기능 구현
  const PRODUCT_DATA = [
    { id: null, value: "주류 선택" },
    { id: "0001", value: "깔루아" },
    { id: "0002", value: "골드 럼" },
    { id: "0003", value: "다크 럼" },
    { id: "0004", value: "데킬라 블랑코" },
    { id: "0005", value: "드라이 베르무트" },
    { id: "0006", value: "럼" },
    { id: "0007", value: "라이트 럼" },
    { id: "0008", value: "말리부 코코넛 럼" },
    { id: "0009", value: "버번" },
    { id: "0010", value: "보드카" },
    { id: "0011", value: "복숭아 슈냅스" },
    { id: "0012", value: "블루 큐라소" },
    { id: "0013", value: "비터즈 소량" },
    { id: "0014", value: "샴페인" },
    { id: "0015", value: "스위트 베르무트" },
    { id: "0016", value: "에프리콧 브랜디" },
    { id: "0017", value: "진" },
    { id: "0018", value: "트리플 섹" },
  ];

  // 주류를 출력할 useState
  const [selectedDropValue, setSelectedDropValue] = useState("주류선택");
  // 선택한 주류들 모아놓은 useState
  const [selectedValue, setSelectedValue] = useState([]);
  const selectList = () =>
    setSelectedValue([...selectedValue, selectedDropValue]);
  console.log(selectedValue);
  // onChange 이벤트가 발생한 target을 받아와 value값이 할당해준다.
  const handleDropProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    // 주류에 넣을 데이터
    setSelectedDropValue(
      PRODUCT_DATA.filter((el) => el.value === value)[0].value
    );
  };

  return (
    <>
      <Cointainer>
        <span>취소</span>
        <span>저장</span>
        <CocktailInput
          value={cocktail}
          onChange={onCocktailChange}
          type="text"
          placeholder="칵테일명"
        ></CocktailInput>
        <UserInput
          value={userName}
          onChange={onUserNameChange}
          type="text"
          placeholder="작성자"
        ></UserInput>
        <CommentInput
          value={comment}
          onChange={onCommentChange}
          type="text"
          placeholder="칵테일 맛을 자유롭게 표현해보세요!"
        ></CommentInput>
        <div>{selectedValue}</div>
        <form onSubmit={onSubmit}>
          <UserImage src={preview} />
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={imageSelectHandler}
          />
        </form>
        <div>
          <select onChange={handleDropProduct} multiple>
            {PRODUCT_DATA.map((el) => (
              <option key={el.id}>{el.value}</option>
            ))}
          </select>

          <div>{selectedDropValue}</div>
          <button onClick={selectList}>추가하기</button>
        </div>
      </Cointainer>
    </>
  );
};

const Cointainer = styled.div`
  position: relative;
  width: 390px;
  height: 844px;
  margin: auto;
  text-align: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const CocktailInput = styled.input`
  width: 300px;
  height: 30px;
  border: transparent;
  border-radius: 20px;
  background-color: ${(props) => props.theme.searchBarColor};
  color: ${(props) => props.theme.textColor};
`;

const UserInput = styled.input`
  width: 300px;
  height: 30px;
  border: transparent;
  border-radius: 20px;
  background-color: ${(props) => props.theme.searchBarColor};
  color: ${(props) => props.theme.textColor};
`;

const CommentInput = styled.input`
  width: 300px;
  height: 30px;
  border: transparent;
  border-radius: 20px;
  background-color: ${(props) => props.theme.searchBarColor};
  color: ${(props) => props.theme.textColor};
`;

const UserImage = styled.img`
  width: 55%;
`;
