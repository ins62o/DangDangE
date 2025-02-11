export const getWeek = (date: Date): number => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0(일) ~ 6(토)

  return Math.ceil((dayOfMonth + firstDayWeekday) / 7);
};
