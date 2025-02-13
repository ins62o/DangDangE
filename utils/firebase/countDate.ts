import { getBloodData } from "./getBloodData";

export const countDate = async (id: string) => {
  // 1. 사용자의 id에 있는 bloodData들을 가져와서 날짜를 뽑아냄
  const bloodData = await getBloodData(id);
  const keys = Object.keys(bloodData).filter((key) => key !== "id");

  // 2. 해당 key들을 날짜순으로 정렬
  const sortedDates = keys.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // 3. 최대로 연속된 날짜를 구해줌
  let days = 1;
  let maxDays = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]).getTime();
    const currentDate = new Date(sortedDates[i]).getTime();

    if (currentDate - prevDate === 86400000) {
      days++;
      maxDays = Math.max(maxDays, days);
    } else {
      days = 1;
    }
  }

  return maxDays;
};
