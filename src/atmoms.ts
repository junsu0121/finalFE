import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const isLoginState = atom({
  key:"isLogin",
  default: false,
})

export const isHomeActiveState = atom({
  key:"isHomeActive",
  default: false,
})

export const isRecipeActiveState = atom({
  key:"isRecipeActive",
  default: false,
})

export const isLibraryActiveState = atom({
  key:"isLibraryActive",
  default: false,
})
export const isStoreActiveState = atom({
  key:"isStoreActive",
  default: false,
})
export const isMyActiveState = atom({
  key:"isMyActive",
  default: false,
})
