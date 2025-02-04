import { atom } from "recoil";

export type User = {
  id: string;
  nickname: string;
};

export const userData = atom<User>({
  key: "userData",
  default: { id: "", nickname: "" },
});
