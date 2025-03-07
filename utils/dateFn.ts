export const getWeek = (date: Date): number => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();
  const firstDayWeekday = firstDayOfMonth.getDay();

  return Math.ceil((dayOfMonth + firstDayWeekday) / 7);
};

export const getTodayDate = () => {
  const today = new Date();
  const kstDate = new Date(today.getTime() + 9 * 60 * 60 * 1000);
  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, "0");
  const days = String(kstDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${days}`;
};
