import { useNavigate, useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atmoms";
import DefaultProfile from "../src_assets/user.png";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const MypageModify = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;

  //darkmode check
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  //darkmode check
  return (
    <>
      {/* darkmode check */}
      <button onClick={toggleDarkAtom}>Toggle Mode</button>
      {/* darkmode check */}
      <MypageContainer>
        <MypageWrap>
          <UserInfo>
            <ProfileDiv>
              <img src={DefaultProfile} alt="DefaultProfile" />
            </ProfileDiv>
            <NickNameWrap>
              <NickName>ㅇㅇㅇ</NickName>
              <Nim>님</Nim>
            </NickNameWrap>
          </UserInfo>
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

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileDiv = styled.div`
  width: 57px;
  height: 57px;
  background-color: ${(props) => props.theme.divBgColor};
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

const NickNameWrap = styled.div`
  width: 25%;
  display: flex;
  flex-direction: row;
  margin-left: 8%;
`;
const NickName = styled.div`
  font-weight: bold;
  font-size: 22px;
`;

const Nim = styled.div`
  font-weight: bolder;
  font-size: 22px;
  margin-left: 3%;
`;
