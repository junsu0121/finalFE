import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import DefaultProfile from "../src_assets/user.png";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { instance } from "../shared/axios";
import { getCookie, setCookie } from "../shared/cookie";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const MypageModify = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;
  const Nickname = getCookie("nickname");
  const NicknameRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  //로그인 안되었을 경우 로그인 페이지로
  useEffect(() => {
    if (getCookie("token") === undefined) {
      navigate("/");
    }
  }, []);

  //닉네임 변경
  const modifyNickName = async () => {
    const data = { nickname: NicknameRef.current.value };
    await instance
      .put("/api/user/changenick", data)
      .then((response) => {
        if (response.data.msg === "1") {
          window.alert("이미 존재하는 닉네임입니다.");
        } else {
          document.cookie =
            "nickname" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
          //닉네임 변경시 /mypage/modify에서 이 세게의 값이 저장되는 버그
          document.cookie =
            "nickname" +
            "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/mypage/modify;";
          document.cookie =
            "token" +
            "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/mypage/modify;";
          document.cookie =
            "email" +
            "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/mypage/modify;";
          setCookie("nickname", data.nickname);
          navigate(`/mypage/${userId}`);
          window.location.reload();
        }
      })
      //실패시 에러메시지 받아옴, 작성한 벨리데이션 문구도 같이
      .catch(function (error) {
        window.alert("서버가 아파요! 잠시만 기다려주세요!");
      });
  };

  //로그아웃
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

  //계정 삭제 모달창
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //계정 삭제
  const deleteAccount = async () => {
    // await axios
    await instance
      .delete("/api/user/")
      //성공시 리스폰스 받아옴
      .then((response) => {
        console.log(response);
        window.alert("탈퇴 완료");
        //탈퇴시 쿠키 제거
        document.cookie =
          "token" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
        document.cookie =
          "nickname" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
        document.cookie =
          "profile" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
        document.cookie =
          "userId" + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;";
        navigate("/");
      })
      .catch(function (error) {
        window.alert("서버가 아파요! 잠시만 기다려주세요!");
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
            <ChangePwTab>
              <Link to={`/mypage/modify/changepw/${userId}`}>
                비밀번호 변경
              </Link>
            </ChangePwTab>
            <OptionLine />
            <div onClick={deleteCookie}>로그아웃</div>
            <OptionLine />
            <div
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              계정 탈퇴
            </div>
            <Modal
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(000,000,000, 0.7)",
                },
                content: {
                  height: "20%",
                  width: "90%",
                  position: "fixed",
                  top: "87.5%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  border: "none",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "5px",
                  outline: "none",
                  padding: "20px",
                  background: "none",
                },
              }}
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
            >
              <ModalWrap>
                <DeleteWrap>
                  <DeleteDesc>삭제된 계정은 복구가 어렵습니다!</DeleteDesc>
                  <hr />
                  <DeleteBtn
                    onClick={() => {
                      deleteAccount();
                    }}
                  >
                    계정 탈퇴
                  </DeleteBtn>
                </DeleteWrap>
                <CancelBtn
                  onClick={() => {
                    setModalIsOpen(false);
                  }}
                >
                  취소
                </CancelBtn>
              </ModalWrap>
            </Modal>
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
  background: linear-gradient(to left, #fa0671, #a62dff, #37bfff);
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

const ChangePwTab = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ModalWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const DeleteWrap = styled.div`
  width: 100%;
  height: 55%;
  border-radius: 7px;
  border: none;
  background-color: #292525e4;
  display: flex;
  flex-direction: column;
  align-items: center;
  hr {
    width: 100%;
    height: 1.5%;
    background-color: #333333;
    border: none;
  }
`;

const DeleteDesc = styled.div`
  font-weight: bolder;
  color: #ababab;
  margin-top: 2%;
`;

const DeleteBtn = styled.div`
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 2.5%;
`;

const CancelBtn = styled.button`
  margin-top: 2%;
  width: 100%;
  height: 33%;
  border-radius: 7px;
  border: none;
  background-color: #292525e4;
  color: #3a95ff;
  font-size: 1.2rem;
  font-weight: bold;
`;
