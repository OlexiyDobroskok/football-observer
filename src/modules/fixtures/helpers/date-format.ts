export const getDateLongFormat = (date: Date) =>
  date.toLocaleString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

export const getTimeShortFormat = (date: Date) =>
  date.toLocaleString("en", {
    timeStyle: "short",
    hour12: false,
  });

export const getWeekDayShortFormat = (date: Date) =>
  date.toLocaleString("en", { weekday: "short" });

export const getDayAndMonthLongFormat = (date: Date) =>
  date.toLocaleString("en", { month: "long", day: "numeric" });
