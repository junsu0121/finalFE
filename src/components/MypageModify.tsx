import { Outlet, useMatch, useNavigate, useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, isLoginState } from "../atmoms";
import DefaultProfile from "../src_assets/user.png";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const MypageModify = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const isLogin = useRecoilValue(isLoginState);
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;
  const changePw = useMatch("/:userId/changepw");

  useEffect(() => {
    console.log(isLogin);
  }, []);

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
              <EditOutlined style={{ fontSize: "24px" }} />
            </IconWrap>
            <Input id="nickname" type="name" placeholder="nickname"></Input>
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
            <div>계정 탈퇴</div>
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Entity = styled.div`
  font-size: 35px;
  font-weight: bolder;
  position: absolute;
  top: 3.7%;
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
