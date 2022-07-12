import { Outlet, useMatch, useNavigate, useParams } from "react-router";
import styled from "styled-components";
import DefaultProfile from "../src_assets/user.png";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { instance } from "../shared/axios";
import { getCookie, setCookie } from "../shared/cookie";

export const MypageModify = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;
  const changePw = useMatch("/:userId/changepw");
  const Nickname = getCookie("nickname");
  const NicknameRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  //로그인 안되었을 경우 로그인 페이지로
  useEffect(() => {
    if (getCookie("token") === undefined) {
      navigate("/");
    }
  }, []);

  const modifyNickName = async () => {
    const data = { nickname: NicknameRef.current.value };
    await instance
      .put("/api/user/changenick", data)
      .then((response) => {
        window.alert(response);
        document.cookie =
          "nickname" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
        setCookie("nickname", data.nickname);
        navigate(`/mypage/${userId}`);
        window.location.reload();
      })
      //실패시 에러메시지 받아옴, 작성한 벨리데이션 문구도 같이
      .catch(function (error) {
        window.alert(error);
      });
  };

  const deleteCookie = () => {
    //로그아웃 시 토큰 삭제
    document.cookie =
      "token" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    document.cookie =
      "nickname" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    document.cookie =
      "profile" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    document.cookie =
      "userId" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
    navigate("/");
    window.location.reload();
  };

  const deleteAccount = async () => {
    // await axios
    await instance
      .post("/api/user")
      //성공시 리스폰스 받아옴
      .then((response) => {
        console.log(response);
        // window.alert(response.message);
        navigate("/");
      })
      .catch(function (error) {
        window.alert(error.message);
      });
  };

  return (
    <>
      <MypageContainer>
        <MypageWrap>
          <Entity
            onClick={() => {
              navigate(`/mypage/${userId}`);
            }}
          >
            &lt;
          </Entity>
          <SettingWrap>
            <Setting>설정</Setting>
          </SettingWrap>
          <ProfileDiv>
            <img src={DefaultProfile} alt="DefaultProfile" />
          </ProfileDiv>
          <InputWrap>
            <IconWrap>
              <EditOutlined
                onClick={() => {
                  modifyNickName();
                }}
                style={{ fontSize: "24px" }}
              />
            </IconWrap>
            <Input
              id="nickname"
              type="name"
              placeholder={Nickname}
              ref={NicknameRef}
            ></Input>
          </InputWrap>
          <Line />
          <OptionWrap>
            <ChangePwTab isActive={changePw !== null}>
              <Link to={`/mypage/modify/${userId}/changepw`}>
                비밀번호 변경
              </Link>
            </ChangePwTab>
            {/* 부모 컴포넌트안에 <Outlet/>으로 원하는 자손 컴포넌트 위치를 정한다. 그리고 context prop으로 자손 컴포넌트에게에게 넘기고 싶은 값을 넣는다. */}
            <Outlet context={{ userId }} />
            <OptionLine />
            <div onClick={deleteCookie}>로그아웃</div>
            <OptionLine />
            <div
              onClick={() => {
                deleteAccount();
                deleteCookie();
              }}
            >
              계정 탈퇴
            </div>
            <OptionLine />
          </OptionWrap>
        </MypageWrap>
      </MypageContainer>
    </>
  );
};

const MypageContainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;

  @media screen and (min-width: 500px) {
  }
`;

const MypageWrap = styled.div`
  height: 100%;
  margin: 10% 5% 0 5%;
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
`;

const Setting = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const ProfileDiv = styled.div`
  margin-top: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputWrap = styled.div`
  height: 5%;
  width: 100%;
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const IconWrap = styled.div`
  position: absolute;
  color: #bababa;
  right: 7%;
`;

const Input = styled.input`
  padding-left: 5%;
  height: 100%;
  width: 90%;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  border: none;
  border: 1px solid #353535;
  font-size: 15px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const Line = styled.hr`
  margin-top: 15%;
  margin-bottom: 15%;
  background: linear-gradient(to left, #ffe64b, #fb3827);
  width: 95%;
  border: none;
  height: 0.2%;
`;

const OptionWrap = styled.div`
  width: 95%;
  div {
    margin: 0 0 8% 3%;
    font-weight: bolder;
  }
`;

const OptionLine = styled.hr`
  width: 95%;
  height: 0.5%;
  border: none;
  background-color: #353535;
  margin-bottom: 10%;
`;

const ChangePwTab = styled.div<{ isActive: boolean }>`
  a {
    text-decoration: none;
    color: inherit;
  }
`;
