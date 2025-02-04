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
      0: [0, 0],
      1: [0, 0],
      2: [0, 0],
      3: [0, 0],
      4: [0, 0],
    },
  },
});
