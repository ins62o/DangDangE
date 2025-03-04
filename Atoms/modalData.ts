import { atom } from "recoil";

export type ChoiceDataType = {
  icon: string;
  title: string;
  info: string;
  action: (() => void) | null;
};

export const ModalData = atom<ChoiceDataType>({
  key: "ModalData",
  default: {
    icon: "",
    title: "",
    info: "",
    action: null as (() => void) | null,
  },
});
