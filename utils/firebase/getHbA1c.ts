import { getBloodData } from "./getBloodData";

type BloodData = {
  id: string;
  [key: string]: any;
};
export const getHbA1c = async (id: string, todaydate: string) => {
  // 1. blood 컬렉션에서 id를 가지고 있는 문서들을 가져옴
  const bloodData: BloodData = await getBloodData(id);
  const dailyBlood = bloodData[todaydate].blood;

  // 2. 오늘 날짜의 혈당 데이터의 값들을 가져옴
  const blood: number[] = Object.values(dailyBlood);

  // 3. 데이터가 존재한다면 오늘 평균 당화혈색소를 구해줌
  if (blood.length > 0) {
    const bloodAvg = (
      (blood.reduce((acc, cur) => acc + Number(cur), 0) / blood.length + 46.7) /
      28.7
    ).toFixed(1);

    return bloodAvg;
  }
};
