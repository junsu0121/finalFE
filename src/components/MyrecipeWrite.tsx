import {
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  UpSquareTwoTone,
} from "@ant-design/icons";
import { Axios, AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { queryClient } from "..";
import { instance } from "../shared/axios";
import { getCookie } from "../shared/cookie";

export const MyrecipeWrite = () => {
  const navigate = useNavigate();
  //칵테일명 input 값 가져오기
  const [cocktail, setCocktail] = useState<string | undefined>("");
  const onCocktailChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCocktail(value);
  };

  //작성자명 input 값 가져오기
  const [userName, setUserName] = useState<string | undefined>("");
  const onUserNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUserName(value);
  };

  // 코멘트 input 값 가져오기
  const [comment, setComment] = useState<string>("");

  const onCommentChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setComment(value);
  };

  // 이미지 업로드 및 미리보기 구현
  const [showImages, setShowImages] = useState([]);
  const [getImages, setGetImages] = useState([]);

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
  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    setGetImages(getImages.filter((_, index) => index !== id));
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

  const SIDE_DATA = [
    { id: null, value: "사이드 선택" },
    { id: "0001", value: "구아바 주스" },
    { id: "0002", value: "라임 주스" },
    { id: "0003", value: "레몬 주스" },
    { id: "0004", value: "사과 주스" },
    { id: "0005", value: "소다수" },
    { id: "0006", value: "오렌지 주스" },
    { id: "0007", value: "진저비어" },
    { id: "0008", value: "콜라" },
    { id: "0009", value: "크린베리 주스" },
    { id: "0010", value: "토닉워터" },
    { id: "0011", value: "토마토 주스" },
    { id: "0012", value: "파인애플 주스" },
  ];

  const GARNISH_DATA = [
    { id: null, value: "가니시 선택" },
    { id: "0001", value: "넛맥(육두구)" },
    { id: "0002", value: "민트 잎" },
    { id: "0003", value: "올리브" },
    { id: "0004", value: "웨지 라임" },
    { id: "0005", value: "웨지 레몬" },
    { id: "0006", value: "웨지 오렌지" },
    { id: "0007", value: "칵테일 체리" },
    { id: "0008", value: "커피 빈" },
    { id: "0009", value: "파인애플" },
  ];

  const ETC_DATA = [
    { id: null, value: "ETC 선택" },
    { id: "0001", value: "계란 흰자" },
    { id: "0002", value: "라임 시럽" },
    { id: "0003", value: "석류 시럽" },
    { id: "0004", value: "슈가 시럽" },
    { id: "0005", value: "얼음" },
    { id: "0006", value: "에스프레소" },
    { id: "0007", value: "코코넛 시럽" },
    { id: "0008", value: "코코넛 크림" },
    { id: "0009", value: "크림" },
  ];
  // 주류를 출력할 useState
  const [selectedDropValue, setSelectedDropValue] = useState("주류선택");
  // 선택한 주류들 모아놓은 useState
  const [selectedValue, setSelectedValue] = useState<string[] | undefined>([]);
  const selectList = () =>
    setSelectedValue([...selectedValue, selectedDropValue]);

  // onChange 이벤트가 발생한 target을 받아와 value값이 할당해준다.
  const handleDropProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    // 주류에 넣을 데이터
    setSelectedDropValue(
      PRODUCT_DATA.filter((el) => el.value === value)[0].value
    );
  };

  // 초기화 버튼
  const clearBtn = () => {
    setSelectedValue([]);
  };

  //SIDE를 출력할 useState
  const [sideSelectValue, setSideSelectValue] = useState("사이드 선택");
  const [sideValue, setSideValue] = useState<string[] | undefined>([]);
  const sideList = () => setSideValue([...sideValue, sideSelectValue]);
  // onChange 이벤트가 발생한 target을 받아와 value값이 할당해준다.
  const handleSideProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    // SIDE에 넣을 데이터
    setSideSelectValue(SIDE_DATA.filter((el) => el.value === value)[0].value);
  };
  // 초기화 버튼
  const clearSideBtn = () => {
    setSideValue([]);
  };

  // GANISH를 출력할 useState
  const [ganishSelcetValue, setGarnishSelectValue] = useState("가니시 선택");
  const [garnishValue, setGarnishValue] = useState<string[] | undefined>([]);
  const garnishList = () =>
    setGarnishValue([...garnishValue, ganishSelcetValue]);

  // onChange 이벤트가 발생한 target을 받아와 value값이 할당해준다.
  const handleGarnishProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    // GANISH에 넣을 데이터
    setGarnishSelectValue(
      GARNISH_DATA.filter((el) => el.value === value)[0].value
    );
  };
  // 초기화 버튼
  const clearGarnishBtn = () => {
    setGarnishValue([]);
  };

  // ETC를 출력할 useState
  const [etcSelectValue, setEtcSelectValue] = useState("ETC 선택");
  const [etcValue, setEtcValue] = useState<string[] | undefined>([]);
  const etcList = () => setEtcValue([...etcValue, etcSelectValue]);

  // onChange 이벤트가 발생한 target을 받아와 value값이 할당해준다.
  const handleEtcProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    // ETC에 넣을 데이터
    setEtcSelectValue(ETC_DATA.filter((el) => el.value === value)[0].value);
  };
  // 초기화 버튼
  const clearEtcBtn = () => {
    setEtcValue([]);
  };

  // STEP기능
  const [countList, setCountList] = useState([]);
  const onAddDetailDiv = () => {
    let countArr = [...countList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setCountList(countArr);
  };

  const [inputs, setInputs] = useState<any>({});
  const [saveinputs, setSaveInputs] = useState([]);
  const [sendInputs, setSendInputs] = useState([]);
  const arrayInput = (
    event: React.FormEvent<HTMLInputElement>,
    ...i: number[]
  ) => {
    const [index] = i;
    setInputs({ ...inputs, [index]: event.currentTarget.value });
    setSaveInputs(
      Object.values({ ...inputs, [index]: event.currentTarget.value })
    );
  };
  console.log(sendInputs);
  const tested = (...i: number[]) => {
    const indexnumber = i[0];
    const [index] = i;
    const newCountList = countList;
    newCountList.splice(index, 1);

    type testObj = {
      [key: string]: any;
    };

    let testObj: testObj = {};
    setCountList((prev) => prev.filter((x) => x !== x[index]));
    for (const key in inputs) {
      if (Number(key) !== indexnumber) {
        testObj[key] = inputs[key];
      }
    }

    setInputs(testObj);
  };

  // 저장버튼

  // 유저 정보 불러오기
  const Nickname = getCookie("nickname");
  const UserId = getCookie("userId");
  const token = getCookie("token");
  //재료들을 배열로 만들기
  const ingredients = [
    ...selectedValue,
    ...sideValue,
    ...garnishValue,
    ...etcValue,
  ];

  const { mutate } = useMutation<any, AxiosError, any, any>(
    "SaveFile",
    async (data) => {
      const response = await instance.post("api/myrecipe/post", data);
      console.log(response);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("SaveFile");
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error(error);
      },
    }
  );

  // data 타입 지정
  interface Idata {
    title: string | null;
    image: object | null;
    ingredients: string[] | null;
    brief_description: string | null;
  }

  const onClickSave = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    for (let i = 0; i < showImages.length; i++) {
      window.URL.revokeObjectURL(showImages[i]);
    }
    console.log(getImages);
    let img = getImages;
    const formData = new FormData();
    for (let i = 0; i < img.length; i++) {
      //  console.log(img[i])
      formData.append("image", img[i]);
      // files.push(img[i])
      navigate("/recipe/search");
    }

    formData.append("title", cocktail);
    formData.append("brief_description", comment);

    for (let i = 0; i < ingredients.length; i++) {
      formData.append(`ingredients[${i}]`, ingredients[i]);
    }

    for (let i = 0; i < saveinputs.length; i++) {
      formData.append(`steps[${i}]`, saveinputs[i]);
    }

    mutate(formData);
  };

  return (
    <>
      <Cointainer>
        <BtnBox>
          <CancelBtn
            onClick={() => {
              navigate(`/recipe/my`);
            }}
          >
            취소
          </CancelBtn>
          <SaveBtn onClick={onClickSave}>저장</SaveBtn>
        </BtnBox>

        <WriteBox>
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
            {showImages.length === 1 ? null : (
              <label onChange={handleAddImg}>
                <input
                  type="file"
                  id="input-file"
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

          <CommentInput
            value={comment}
            onChange={onCommentChange}
            type="text"
            placeholder="칵테일 맛을 자유롭게 표현해보세요!"
          ></CommentInput>
        </WriteBox>
        <IngredientPtag>
          주류
          <RemoveSpan onClick={clearBtn}>
            {" "}
            <DeleteOutlined />
          </RemoveSpan>
        </IngredientPtag>
        <IngredientBox>
          {selectedValue.map((v, i) => (
            <Ingredients key={i}>{v}</Ingredients>
          ))}
        </IngredientBox>
        <IngredientPtag>
          SIDE{" "}
          <RemoveSpan onClick={clearSideBtn}>
            {" "}
            <DeleteOutlined />
          </RemoveSpan>
        </IngredientPtag>
        <IngredientBox>
          {sideValue.map((v, i) => (
            <Ingredients key={i}>{v}</Ingredients>
          ))}
        </IngredientBox>
        <IngredientPtag>
          GARNISH{" "}
          <RemoveSpan onClick={clearGarnishBtn}>
            {" "}
            <DeleteOutlined />
          </RemoveSpan>
        </IngredientPtag>
        <IngredientBox>
          {garnishValue.map((v, i) => (
            <Ingredients key={i}>{v}</Ingredients>
          ))}
        </IngredientBox>

        <IngredientPtag>
          ETC{" "}
          <RemoveSpan onClick={clearEtcBtn}>
            {" "}
            <DeleteOutlined />
          </RemoveSpan>
        </IngredientPtag>
        <IngredientBox>
          {etcValue.map((v, i) => (
            <Ingredients key={i}>{v}</Ingredients>
          ))}
        </IngredientBox>

        <IngredientSelectBox>
          <IngredientSelect onChange={handleDropProduct}>
            {PRODUCT_DATA.map((el) => (
              <IngredientOption key={el.id}>{el.value}</IngredientOption>
            ))}
          </IngredientSelect>
          <PlusSpan onClick={selectList}>
            <PlusOutlined />
          </PlusSpan>
        </IngredientSelectBox>

        <IngredientSelectBox>
          <IngredientSelect onChange={handleSideProduct}>
            {SIDE_DATA.map((el) => (
              <IngredientOption key={el.id}>{el.value}</IngredientOption>
            ))}
          </IngredientSelect>
          <PlusSpan onClick={sideList}>
            {" "}
            <PlusOutlined />
          </PlusSpan>
        </IngredientSelectBox>

        <IngredientSelectBox>
          <IngredientSelect onChange={handleGarnishProduct}>
            {GARNISH_DATA.map((el) => (
              <IngredientOption key={el.id}>{el.value}</IngredientOption>
            ))}
          </IngredientSelect>
          <PlusSpan onClick={garnishList}>
            {" "}
            <PlusOutlined />
          </PlusSpan>
        </IngredientSelectBox>

        <IngredientSelectBox>
          <IngredientSelect onChange={handleEtcProduct}>
            {ETC_DATA.map((el) => (
              <IngredientOption key={el.id}>{el.value}</IngredientOption>
            ))}
          </IngredientSelect>
          <PlusSpan onClick={etcList}>
            {" "}
            <PlusOutlined />
          </PlusSpan>
        </IngredientSelectBox>

        <IngredientPtag>방법</IngredientPtag>
        <StepDiv>
          <div>
            {countList &&
              countList.map((item, i) => (
                <div key={i}>
                  <StepLabel>STEP{i + 1}</StepLabel>
                  <div>
                    <StepInput
                      value={inputs[i]}
                      onChange={(e) => {
                        arrayInput(e, i);
                      }}
                      placeholder="제조순서를 작성해 주세요"
                    />
                    <StepDelete onClick={() => tested(i)}>
                      <DeleteOutlined />
                    </StepDelete>
                  </div>
                </div>
              ))}
          </div>
          <PlusBtn onClick={onAddDetailDiv}>
            {" "}
            <PlusOutlined />
            추가하기
          </PlusBtn>
        </StepDiv>

        <Div />
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

const WriteBox = styled.div``;

const CocktailInput = styled.input`
  width: 300px;
  height: 60px;
  font-size: 25px;
  border: transparent;
  justify-content: center;
  text-align: center;
  border-radius: 20px;

  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const UserInput = styled.input`
  width: 300px;
  height: 30px;
  margin: 1%;
  /* border: 1px solid white; */
  border: transparent;
  border-radius: 20px;
  justify-content: center;
  text-align: center;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const CommentInput = styled.input`
  width: 300px;
  height: 30px;
  margin: 10%;
  border: transparent;
  border-radius: 20px;
  justify-content: center;
  text-align: center;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const UserImage = styled.img`
  width: 55%;
`;

const IngredientSelectBox = styled.div`
  display: flex;
`;

const IngredientSelect = styled.select`
  width: 300px;
  margin: 3%;
  /* height: 30px; */
  background-color: ${(props) => props.theme.bgColor};
  color: white;
  border: 1px solid black;
  select::-ms-expand {
    display: none;
  }
  option {
    background-color: #2b2737;
    padding: 30%;
    height: 30px;
  }
`;

const IngredientOption = styled.option`
  display: inline-box;
  background-color: #2b2737;
  padding: 30%;
  height: 30px;
`;

const BtnBox = styled.div`
  position: relative;
  display: flex;
  margin: 10%;
`;

const CancelBtn = styled.div`
  left: -5%;
  position: absolute;
  cursor: pointer;
`;

const SaveBtn = styled.div`
  right: -5%;
  position: absolute;
  cursor: pointer;
`;

const IngredientBox = styled.div`
  display: flex;
`;

const IngredientPtag = styled.p`
  display: flex;
  width: 100px;
  font-size: 17px;
  font-weight: bold;
  margin: 3%;
  margin-right: 85%;
`;

const Ingredients = styled.p`
  width: auto;
  margin: 3px;
`;

const StepDiv = styled.div`
  /* border: 1px solid white; */
`;

const StepInput = styled.input`
  width: 300px;
  height: 30px;
  margin: 3%;
  border: transparent;
  border-radius: 20px;
  justify-content: center;
  text-align: center;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const StepLabel = styled.label`
  margin-right: 65%;
`;

const Div = styled.div`
  height: 100px;
  width: 100%;
`;

const StepDelete = styled.span`
  cursor: pointer;
`;

const RemoveSpan = styled.span`
  cursor: pointer;
  margin-left: 8%;
`;

const PlusSpan = styled.span`
  margin: 3%;
  cursor: pointer;
`;

const PlusBtn = styled.button`
  width: 95%;
  margin: 5% 0 5% 0;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #272a2f;
  color: #a7a7a7;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;

const Preview = styled.div`
  width: 100%;
  height: 10%;
  justify-content: center;
  display: flex;
`;

const PreviewImg = styled.img`
  width: 120px;
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
