import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { instance } from "../shared/axios";

interface IFormData {
  password: string;
  newpassword: string;
  confirmnewpassword: string;
}

export const ChangePw = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>();

  const deleteCookie = () => {
    //로그아웃 시 토큰 삭제
    document.cookie =
      "token" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    document.cookie =
      "email" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    document.cookie =
      "nickname" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    document.cookie =
      "profile" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    navigate("/");
    window.location.reload();
  };

  const onValid = async (data: IFormData) => {
    if (data.newpassword !== data.confirmnewpassword)
      setError(
        "confirmnewpassword",
        { message: "비밀번호가 틀립니다." },
        //error 발생시 그 input으로 focus
        { shouldFocus: true }
      );
    let newdata = { password: data.password, newpassword: data.newpassword };

    // // await axios
    await instance
      .put("/api/user/changepassword", newdata)

      .then((response) => {
        window.alert(response);
        deleteCookie();
      })
      //실패시 에러메시지 받아옴, 작성한 벨리데이션 문구도 같이
      .catch(function (error) {
        window.alert(error.response.data.message);
      });
  };

  return (
    <>
      <Container>
        <ChangePwWrap>
          <ChangePwForm onSubmit={handleSubmit(onValid)}>
            <Input
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
            <ChangePwBtn>변경하기</ChangePwBtn>
          </ChangePwForm>
          <CancelBtn
            onClick={() => {
              window.history.back();
            }}
          >
            취소하기
          </CancelBtn>
        </ChangePwWrap>
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  height: auto;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 500px) {
  }
`;

const ChangePwWrap = styled.div`
  width: 300px;
  height: 200px;
  background-color: transparent;
  border-radius: 5px;
  button {
    border-radius: 5px;
    background: linear-gradient(to left, #ffe64b, #fb3827);
    border: none;
  }
`;
const ChangePwForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5% 3% 5% 0;
`;

const Input = styled.input`
  padding: 0 0 5% 0;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  font-size: 12px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
const ErrorMsg = styled.span`
  font-size: 8px;
  margin: 2% 0 2% 0;
  /* font-weight: bolder; */
`;

const ChangePwBtn = styled.button``;

const CancelBtn = styled.button`
  width: 97%;
`;
