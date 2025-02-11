import { atom } from "recoil";

export type Blood = {
  blood: { [key: string]: string };
  memo: string;
};

export const writeData = atom<Blood>({
  key: "writeData",
  default: {
    blood: {},
    memo: "",
  },
});
