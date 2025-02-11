export type userType = {
  id: string;
  nickname: string;
  type: string;
  time: string[];
  heal: string[];
  goal: {
    [key: string]: [number, number];
  };
};
