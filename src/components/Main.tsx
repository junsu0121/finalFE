import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const Main = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <>
      <Title>나는 다크모드 확인용이에요</Title>
      <button onClick={toggleDarkAtom}>Toggle Mode</button>
    </>
  );
};

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;
