import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const isLoginState = atom({
  key:"isLogin",
  default: false,
})
