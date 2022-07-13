import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AlcoholDetail } from "./components/AlcoholDetail";
import { AlcoholLibrary } from "./components/AlcoholLibrary";
import { AlcoholLibraryDetail } from "./components/AlcoholLibraryDetail";
import { AlcoholWrite } from "./components/AlcoholWrite";
import { Bar } from "./components/Bar";
import { BarWrite } from "./components/BarWrite";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { MyBar } from "./components/MyBar";
import { Mypage } from "./components/Mypage";
import { Recipe } from "./components/Recipe";
import { Recipe_My } from "./components/Recipe_My";
import { Signup } from "./components/Signup";
import { Start } from "./components/Start";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom, isLoginState } from "./atmoms";
import { darkTheme, lightTheme } from "./theme";
import { RecipeSearch } from "./components/RecipeSearch";
import { PageNotFound } from "./components/PageNotFound";
import { KakaoRedirect } from "./components/KakaoRedirect";
import { GoogleRedirect } from "./components/GoogleRedirect";
import { SignupPick } from "./components/SignupPick";
import { MyFaAlcohol } from "./components/MyFaAlcohol";
import { MyFaRecipe } from "./components/MyFaRecipe";
import { MyFaStore } from "./components/MyFaStore";
import { MypageModify } from "./components/MypageModify";
import { BarList } from "./components/BarList";
import { BarMyList } from "./components/BarMyList";
import { OurRecipe } from "./components/OurRecipe";
import { AlcoholLibraryList } from "./components/AlcoholLibraryList";
import { ChangePw } from "./components/ChangePw";
import { getCookie } from "./shared/cookie";
import { OurRecipeDetail } from "./components/OurRecipeDetail";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a{
  text-decoration:none;
  color:inherit;
}

`;
interface ICoinProps {}
function App({}: ICoinProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  useEffect(() => {
    if (getCookie("token") !== undefined) {
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <div className="App">
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Footer></Footer>
        <Routes>
          <Route path="/ourRecipe" element={<OurRecipe />}></Route>
          <Route
            path="/ourRecipe/:recipeId"
            element={<OurRecipeDetail />}
          ></Route>
          <Route path="/alcoholDetail" element={<AlcoholDetail />}></Route>
          <Route path="/alcoholLibrary" element={<AlcoholLibrary />}>
            {/* alcoholLibrary의 자식컴포넌트 */}
            <Route
              path="/alcoholLibrary/:categoryId"
              element={<AlcoholLibraryList />}
            />
          </Route>
          <Route
            path="/AlcoholLibraryDetail/:drinkId"
            element={<AlcoholLibraryDetail />}
          ></Route>
          <Route path="/alcoholWrite" element={<AlcoholWrite />}></Route>
          <Route path="/bar" element={<Bar />}>
            {/* mybar의 자식 컴포넌트  */}
            <Route path="barlist" element={<BarList />} />
            <Route path="barmylist" element={<BarMyList />} />
          </Route>
          <Route path="/barwrite/:id" element={<BarWrite />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/mybar" element={<MyBar />}></Route>
          <Route path="/mypage/:userId" element={<Mypage />}>
            {/* mypage의 자식 컴포넌트  */}
            <Route path="myfaalcohol" element={<MyFaAlcohol />} />
            <Route path="myfarecipe" element={<MyFaRecipe />} />
            <Route path="myfastore" element={<MyFaStore />} />
          </Route>
          <Route
            path="/mypage/modify/:userId"
            element={<MypageModify />}
          ></Route>
          <Route
            path="/mypage/modify/changepw/:userId"
            element={<ChangePw />}
          />

          <Route path="/recipe" element={<Recipe />}>
            <Route path="my" element={<Recipe_My />}></Route>
            <Route path="search" element={<RecipeSearch />}></Route>
          </Route>
          <Route path="/signuppick" element={<SignupPick />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="*" element={<PageNotFound />} />
          {/* <Route path="/oauth/kakao/callback" element={<KakaoRedirect />} /> */}
          <Route path="/api/user/kakao/callback" element={<KakaoRedirect />} />
          <Route path="/oauth/google/callback" element={<GoogleRedirect />} />
          {/* <Route path='/oauth/naver/callback' element={<NaverRedirect/>}/> */}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
