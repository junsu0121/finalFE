import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";
import styled from "styled-components";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const Recipe_My = () => {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <Cointainer>
      <RecipeList>
        <RecipeCard></RecipeCard>
      </RecipeList>
    </Cointainer>
  );
};

const Cointainer = styled.div`
  width: 390px;
  height: 844px;
  margin: auto;
  text-align: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const RecipeList = styled.div`
  /* background-color: red; */
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  margin: auto;
  width: 100%;
  height: 100px;
  border: solid 1px ${(props) => props.theme.bgColor};
  border-radius: 5px;
`;
const RecipeCard = styled.div`
  width: 85%;
  height: 80%;
  margin: auto;
  /* border: 1px solid ${(props) => props.theme.bggrColor}; */
  border-radius: 10px;
  align-items: center;
  /* padding: 10px; */
  background-color: ${(props) => props.theme.recipebgColor};
  color: black;
  cursor: pointer;

  :hover {
    box-shadow: ${(props) => props.theme.hoverColor} 0px 5px 15px 5px;
  }
`;
