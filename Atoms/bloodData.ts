import { atom } from "recoil";

export type Blood = {
  type: string;
  time: string[];
  heal: string[];
  goal: {
    [key: number]: [number, number];
  };
};

export const userBloodData = atom<Blood>({
  key: "userBloodData",
  default: {
    type: "",
    time: [],
    heal: [],
    goal: {
      0: [80, 130],
      1: [90, 180],
      2: [90, 180],
      3: [90, 180],
      4: [100, 140],
    },
  },
});
