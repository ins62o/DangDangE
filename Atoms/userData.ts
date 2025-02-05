import { atom } from "recoil";

export type User = {
  id: string;
  nickname: string;
};

export const userData = atom<User>({
  key: "userData",
  default: { id: "로그인이 필요합니다.", nickname: "게스트" },
});
