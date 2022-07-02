import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atmoms";

//다크모드 쓸려면
// options={{
//   theme: {
//     mode: isDark ? "dark" : "light",
//   } 이거 컴포넌트 안에 넣으면 될지도...?
export const AlcoholLibrary = () => {
  const isDark = useRecoilValue(isDarkAtom);
  return null;
};
