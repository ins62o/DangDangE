import { atom } from "recoil";

export type MarkedDate = {
  marked?: boolean;
  dotColor?: string;
  selected?: boolean;
  selectedColor?: string;
};

export type homeType = {
  markingData: MarkedDate;
  countDay?: number;
  bloodAvg?: number;
};

export const homeData = atom<homeType>({
  key: "homeData",
  default: {
    markingData: {},
    countDay: 0,
    bloodAvg: 0,
  },
});
