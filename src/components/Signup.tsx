import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atmoms";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

interface IFormData {
  email: string;
  password: string;
  nickname: string;
  confirmpassword: string;
}

export const Signup = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<IFormData>();

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

  const onValid = async (data: IFormData) => {
    if (data.password !== data.confirmpassword)
      setError(
        "confirmpassword",
        { message: "비밀번호가 틀립니다." },
        //error 발생시 그 input으로 focus
        { shouldFocus: true }
      );
    await axios
      .post("https://www.btenderapi.com/api/user/signup", data)
      // .post("/user/signup", users)
      //성공시 리스폰스 받아옴
      .then((response) => {
        window.alert("회원가입 성공");
        navigate("/");
      })
      //실패시 에러메시지 받아옴, 작성한 벨리데이션 문구도 같이
      .catch(function (error) {
        if (error.response.data.errorMessage === "1") {
          window.alert("비밀번호가 일치하지 않습니다.");
        } else if (error.response.data.errorMessage === "2") {
          window.alert("이미 가입된 이메일입니다.");
        } else if (error.response.data.errorMessage === "3") {
          window.alert("중복된 닉네임입니다.");
        } else {
          window.alert("회원가입 실패");
        }
      });
  };

  return (
    <>
      <SignupContainer>
        <SignupWrap>
          <Entity
            onClick={() => {
              navigate(`/`);
            }}
          >
            &lt;
          </Entity>
          <p style={{ fontWeight: "bold", fontSize: "30px" }}>가입하기</p>

          <SignupForm onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value:
                    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                  message: "Only Emails allowed",
                },
              })}
              id="email"
              type="email"
              placeholder="이메일 입력"
            ></Input>
            <ErrorMsg>{errors?.email?.message}</ErrorMsg>
            <Input
              {...register("nickname", {
                required: "Nickname is Required",
                pattern: {
                  value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{3,10}$/,
                  message: "닉네임은 3~8자 한글,영어,숫자",
                },
              })}
              id="nickname"
              type="name"
              placeholder="닉네임 입력"
            ></Input>
            <ErrorMsg>{errors?.nickname?.message}</ErrorMsg>
            <Input
              {...register("password", {
                required: "Password is Required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{3,10}$/,
                  message: "비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로",
                  // /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[0-9a-zA-Z@$!%*#?&]{3,10}$/;
                  //비밀번호는 3 ~ 10자 영문, 숫자 및 특수문자조합으로
                },
              })}
              id="password"
              type="password"
              placeholder="비밀번호 입력"
            ></Input>
            <ErrorMsg>{errors?.password?.message}</ErrorMsg>
            <Input
              {...register("confirmpassword", {
                required: "비밀번호를 재입력 해주세요",
              })}
              id="confirmpassword"
              type="password"
              placeholder="비밀번호 재입력"
            ></Input>
            <ErrorMsg>{errors?.confirmpassword?.message}</ErrorMsg>
            <SignupBtn disabled={!isActive}>회원가입</SignupBtn>
          </SignupForm>
        </SignupWrap>
      </SignupContainer>
    </>
  );
};

const SignupContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;

  @media screen and (min-width: 500px) {
  }
`;

const SignupWrap = styled.div`
  height: 100%;
  margin: 20% 5% 0 5%;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10% 0 10% 0;
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
`;

const Entity = styled.div`
  font-size: 30px;
  font-weight: bolder;
  position: absolute;
  top: 4%;
  color: grey;
`;
