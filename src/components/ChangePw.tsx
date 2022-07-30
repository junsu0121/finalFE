import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { instance } from "../shared/axios";

interface IFormData {
  password: string;
  newpassword: string;
  confirmnewpassword: string;
}

export const ChangePw = () => {
  const params = useParams();
  const userId = params.userId;
  const navigate = useNavigate();

  //react-hook-form에서 쓸 애들 꺼내 쓰기
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<IFormData>();

  const deleteCookie = () => {
    //비밀번호 변경시 로그아웃 토큰 삭제
    document.cookie =
      "token" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    document.cookie =
      "userId" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    document.cookie =
      "nickname" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    document.cookie =
      "profile" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    navigate("/");
    window.location.reload();
  };

  //react-hook-form 비밀번호 활성활 비활성화
  const [isActive, setIsActive] = useState(false);
  const watchAll = Object.values(watch());

  useEffect(() => {
    if (watchAll.every((el) => el)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [watchAll]);

  //react-hook-form 넘길때 추가 에러 설정 및  데이터 서버에 넘기기
  const onValid = async (data: IFormData) => {
    if (data.newpassword !== data.confirmnewpassword) {
      setError(
        "confirmnewpassword",
        { message: "새로 설정한 비밀번호를 다시 입력해주세요." },
        //error 발생시 그 input으로 focus
        { shouldFocus: true }
      );
    } else if (data.newpassword === data.password) {
      setError(
        "newpassword",
        { message: "기존 비밀번호와 동일합니다." },
        //error 발생시 그 input으로 focus
        { shouldFocus: true }
      );
    } else {
      let newData = { password: data.password, newpassword: data.newpassword };

      // // await axios
      await instance
        .put("/api/user/changepassword", newData)

        .then((response) => {
          window.alert("비밀번호가 변경되었습니다.");
          deleteCookie();
        })
        //실패시 에러메시지 받아옴, 작성한 벨리데이션 문구도 같이
        .catch(function (error) {
          if (error.response.data.errorMessage === "1") {
            window.alert("존재하는 유저가 아닙니다.");
          } else if (error.response.data.errorMessage === "2") {
            window.alert("비밀번호가 올바르지 않습니다.");
          } else {
            window.alert("다시 시도해주세요.");
          }
        });
    }
  };

  return (
    <>
      <Container>
        <PwChangeWrap>
          <Entity
            onClick={() => {
              navigate(`/mypage/modify/${userId}`);
            }}
          >
            &lt;
          </Entity>
          <SettingWrap>
            <Setting>비밀번호 변경</Setting>
          </SettingWrap>
          <PwChangeForm onSubmit={handleSubmit(onValid)}>
            <Input
              //...register로 hook-form에 등록, ("이름지어주기",{required나 validation패턴 넣어주기})
              {...register("password", {
                required: "비밀번호를 입력하세요!",
                pattern: {
                  value: /^[0-9a-z]{6,}$/,
                  message: "PW는 4자 이상, 숫자/영어/특수문자",
                },
              })}
              id="password"
              type="password"
              placeholder="현재 비밀번호 입력"
            ></Input>
            {/* 에러메시지는 input아래 출력 */}
            <ErrorMsg>{errors?.password?.message}</ErrorMsg>
            <Input
              {...register("newpassword", {
                required: "비밀번호를 입력하세요!",
                pattern: {
                  value: /^[0-9a-z]{6,}$/,
                  message: "PW는 4자 이상, 숫자/영어/특수문자",
                },
              })}
              id="newpassword"
              type="password"
              placeholder="새 비밀번호 입력"
            ></Input>
            <ErrorMsg>{errors?.newpassword?.message}</ErrorMsg>
            <Input
              {...register("confirmnewpassword", {
                required: "비밀번호를 재입력 해주세요",
              })}
              id="confirmpassword"
              type="password"
              placeholder="새 비밀번호 재입력"
            ></Input>
            <ErrorMsg>{errors?.confirmnewpassword?.message}</ErrorMsg>
            <SignupBtn disabled={!isActive}>확인</SignupBtn>
          </PwChangeForm>
        </PwChangeWrap>
      </Container>
    </>
  );
};
const Container = styled.div`
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

const PwChangeWrap = styled.div`
  height: 100%;
  margin: 10% 5% 0% 5%;
  display: flex;
  flex-direction: column;
`;

const SettingWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Entity = styled.div`
  font-size: 30px;
  font-weight: bolder;
  position: absolute;
  top: 4%;
  color: grey;
  cursor: pointer;
`;

const Setting = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const PwChangeForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20% 0 10% 0;
`;

const Input = styled.input`
  padding: 0 0 5% 0;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  font-size: 15px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
const ErrorMsg = styled.span`
  margin: 3% 0 5% 0;
  color: red;
  /* font-weight: bolder; */
`;

const SignupBtn = styled.button`
  margin: 5% 0 5% 0;
  height: 50px;
  border: none;
  border-radius: 10px;
  background: ${(props) =>
    props.disabled
      ? "#777777"
      : "linear-gradient(to left, #fa0671, #a62dff, #37bfff)"};
  color: white;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;
