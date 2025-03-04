import { atom } from "recoil";

export type keyBoardType = {
  title: string;
  text: string;
};

export const keyboardData = atom<keyBoardType>({
  key: "keyboardData",
  default: {
    title: "",
    text: "",
  },
});
