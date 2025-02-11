import { atom } from "recoil";

export type Blood = {
  type: string;
  time: string[];
  heal: string[];
  goal: {
    [key: string]: [number, number];
  };
};

export const userBloodData = atom<Blood>({
  key: "userBloodData",
  default: {
    type: "",
    time: [],
    heal: [],
    goal: {
      "🌚 식전 혈당(공복)": [80, 130],
      "🔆 아침 식후 2시간 혈당": [90, 180],
      "⛅ 점심 식후 2시간 혈당": [90, 180],
      "🌙 저녁 식후 2시간 혈당": [90, 180],
      "🛏 취침 전 혈당": [100, 140],
    },
  },
});
