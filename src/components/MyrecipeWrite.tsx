import { useState } from "react";
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

  return (
    <>
      <Cointainer>
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

        <form onSubmit={onSubmit}>
          <UserImage src={preview} />
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={imageSelectHandler}
          />
        </form>
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
