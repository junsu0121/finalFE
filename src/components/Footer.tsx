import { useNavigate } from "react-router";
import styled from "styled-components";
import { getCookie } from "../shared/cookie";
import homeIcon from "../src_assets/footerhome.png";
import homeFillIcon from "../src_assets/footerhomefill.png";
import recipeIcon from "../src_assets/footerrecipe.png";
import recipeFillIcon from "../src_assets/footerrecipefill.png";
import libraryIcon from "../src_assets/footerlibrary.png";
import libraryFillIcon from "../src_assets/footerlibraryfill.png";
import storeIcon from "../src_assets/footerstore.png";
import storeFillIcon from "../src_assets/footerstorefill.png";
import myIcon from "../src_assets/footermy.png";
import myFillIcon from "../src_assets/footermyfill.png";
import { useRecoilState } from "recoil";
import {
  isHomeActiveState,
  isLibraryActiveState,
  isMyActiveState,
  isRecipeActiveState,
  isStoreActiveState,
} from "../atmoms";

export const Footer = () => {
  const navigate = useNavigate();
  const userId = getCookie("userId");
  const [homeActive, setHomeActive] = useRecoilState(isHomeActiveState);
  const [recipeActive, setRecipeActive] = useRecoilState(isRecipeActiveState);
  const [libraryActive, setLibraryActive] =
    useRecoilState(isLibraryActiveState);
  const [storeActive, setStoreActive] = useRecoilState(isStoreActiveState);
  const [myActive, setMyActive] = useRecoilState(isMyActiveState);
  return (
    <>
      <FooterWrap>
        <div
          onClick={() => {
            setHomeActive(true);
            setRecipeActive(false);
            setLibraryActive(false);
            setStoreActive(false);
            setMyActive(false);
            navigate("/main");
          }}
        >
          {!homeActive ? (
            <Icon src={homeIcon} alt="" />
          ) : (
            <Icon src={homeFillIcon} alt="" />
          )}
        </div>
        <div
          onClick={() => {
            setHomeActive(false);
            setRecipeActive(true);
            setLibraryActive(false);
            setStoreActive(false);
            setMyActive(false);
            navigate("/recipe/search");
          }}
        >
          {!recipeActive ? (
            <Icon src={recipeIcon} alt="" />
          ) : (
            <Icon src={recipeFillIcon} alt="" />
          )}
        </div>
        <div
          onClick={() => {
            setHomeActive(false);
            setRecipeActive(false);
            setLibraryActive(true);
            setStoreActive(false);
            setMyActive(false);
            navigate("/alcoholLibrary/62c3de5f57b3cc6babc431bf");
          }}
        >
          {!libraryActive ? (
            <Icon src={libraryIcon} alt="" />
          ) : (
            <Icon src={libraryFillIcon} alt="" />
          )}
        </div>
        <div
          onClick={() => {
            setHomeActive(false);
            setRecipeActive(false);
            setLibraryActive(false);
            setStoreActive(true);
            setMyActive(false);
            navigate("/bar/barlist");
          }}
        >
          {!storeActive ? (
            <StoreIcon src={storeIcon} alt="" />
          ) : (
            <StoreFillIcon src={storeFillIcon} alt="" />
          )}
        </div>
        <div
          onClick={() => {
            setHomeActive(false);
            setRecipeActive(false);
            setLibraryActive(false);
            setStoreActive(false);
            setMyActive(true);
            navigate(`/mypage/${userId}`);
          }}
        >
          {!myActive ? (
            <Icon src={myIcon} alt="" />
          ) : (
            <Icon src={myFillIcon} alt="" />
          )}
        </div>
      </FooterWrap>
    </>
  );
};

const FooterWrap = styled.div`
  width: 100%;
  height: 7%;
  bottom: -7%;
  transform: translateY(-100%);
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: black;
  border-top-left-radius: 0.7em;
  border-top-right-radius: 0.7em;
  div {
  }
`;

const Icon = styled.img``;

const StoreIcon = styled.img`
  margin-top: 16%;
  height: 45px;
`;

const StoreFillIcon = styled.img`
  height: 38px;
`;
