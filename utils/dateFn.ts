export const getWeek = (date: Date): number => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0(일) ~ 6(토)

  return Math.ceil((dayOfMonth + firstDayWeekday) / 7);
};

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const days = today.getDate();
  const todaydate = `${year}-${String(month).padStart(2, "0")}-${String(
    days
  ).padStart(2, "0")}`;

  return todaydate;
};
