import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
interface ICoinsProps {}
export const MyBar = ({}: ICoinsProps) => {
  const navigate = useNavigate();
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <Title>다크모드 확인용입니다</Title>
      <button
        onClick={() => {
          navigate(`/main`);
        }}
      >
        다크모드확인하러가기
      </button>
    </>
  );
};

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;
