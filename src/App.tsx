import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AlcoholDetail } from "./components/AlcoholDetail";
import { AlcoholLibrary } from "./components/AlcoholLibrary";
import { AlcoholLibraryDetail } from "./components/AlcoholLibraryDetail";
import { AlcoholWrite } from "./components/AlcoholWrite";
import { Bar } from "./components/Bar";
import { BarWrite } from "./components/BarWrite";
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { MyBar } from "./components/MyBar";
import { Mypage } from "./components/Mypage";
import { Recipe } from "./components/Recipe";
import { Recipe_My } from "./components/Recipe_My";
import { Signup } from "./components/Signup";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom, isLoginState } from "./atmoms";
import { darkTheme, lightTheme } from "./theme";
import { RecipeSearch } from "./components/RecipeSearch";
import { PageNotFound } from "./components/PageNotFound";
import { Oauth } from "./components/Oauth";
import { SignupPick } from "./components/SignupPick";
import { MyFaAlcohol } from "./components/MyFaAlcohol";
import { MyFaRecipe } from "./components/MyFaRecipe";
import { MyFaStore } from "./components/MyFaStore";
import { MypageModify } from "./components/MypageModify";
import { BarList } from "./components/BarList";
import { BarMyList } from "./components/BarMyList";
import { OurRecipe } from "./components/OurRecipe";
// import { AlcoholLibraryList } from "./components/AlcoholLibraryList";
import { ChangePw } from "./components/ChangePw";
import { getCookie } from "./shared/cookie";
import { OurRecipeDetail } from "./components/OurRecipeDetail";
import { MyrecipeWrite } from "./components/MyrecipeWrite";
import { RecipeSearchDetail } from "./components/RecipeSearchDetail";
import { BarDetail } from "./components/BarDetail";
import { BarModify } from "./components/BarModify";
import { Userget } from "./components/Userget";
import { RecipeModify } from "./components/RecipeModify";
import { RouteChangeTracker } from "./components/RouteChangeTracker";
import { VODKA } from "./components/VODKA";
import { GIN } from "./components/GIN";
import { RUM } from "./components/RUM";
import { TEQUILA } from "./components/TEQUILA";
import { LIQUEUR } from "./components/LIQUEUR";
import { AlcoholLibrarySearch } from "./components/AlcoholLibrarySearch";

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

function App() {
  RouteChangeTracker();
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
        <Routes>
          <Route
            path="/RecipeModify/:userId"
            element={<RecipeModify />}
          ></Route>
          <Route path="/myrecipeWrite" element={<MyrecipeWrite />}></Route>
          <Route path="/ourRecipe" element={<OurRecipe />}></Route>
          <Route
            path="/ourRecipe/:recipeId"
            element={<OurRecipeDetail />}
          ></Route>
          <Route path="/alcoholDetail" element={<AlcoholDetail />}></Route>
          <Route path="/alcoholLibrary" element={<AlcoholLibrary />}>
            <Route path="search/:value" element={<AlcoholLibrarySearch />} />
            <Route path="vodka/:categoryId" element={<VODKA />} />
            <Route path="gin/:categoryId" element={<GIN />} />
            <Route path="rum/:categoryId" element={<RUM />} />
            <Route path="tequila/:categoryId" element={<TEQUILA />} />
            <Route path="liqueur/:categoryId" element={<LIQUEUR />} />
          </Route>
          <Route
            path="/AlcoholLibraryDetail/:drinkId"
            element={<AlcoholLibraryDetail />}
          ></Route>
          <Route path="/alcoholWrite" element={<AlcoholWrite />}></Route>
          <Route path="/bar" element={<Bar />}>
            {/* mybar의 자식 컴포넌트  */}
            <Route path="barlist" element={<BarList />} />
            <Route path="barmylist/:userId" element={<BarMyList />} />
          </Route>
          <Route path="/barwrite" element={<BarWrite />}></Route>
          <Route path="/barmodify/:barId" element={<BarModify />}></Route>
          <Route path="/bardetail/:barId" element={<BarDetail />}></Route>
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
          <Route
            path="/recipe/search/:myrecipeId"
            element={<RecipeSearchDetail />}
          ></Route>
          <Route path="/signuppick" element={<SignupPick />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/oauth/:token" element={<Oauth />} />
          <Route path="/oauth/userget" element={<Userget />} />
          {/* <Route path="auth" element={<Auth />} /> */}
          {/* <Route path="/oauth/google/callback" element={<GoogleRedirect />} /> */}
          {/* <Route path='/oauth/naver/callback' element={<NaverRedirect/>}/> */}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
