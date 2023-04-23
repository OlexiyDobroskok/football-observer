const getWeekDayLF = (date: Date) =>
  date.toLocaleString("en", { weekday: "long" });

const getMonthLF = (date: Date) => date.toLocaleString("en", { month: "long" });

const getMonthDaySF = (date: Date) =>
  date.toLocaleString("en", { day: "numeric" });

export const getDateLongFormat = (date: Date) =>
  `${getWeekDayLF(date)} ${getMonthDaySF(date)} ${getMonthLF(
    date
  )} ${date.getFullYear()}`;

export const getTimeShortFormat = (date: Date) =>
  date.toLocaleString("en", {
    timeStyle: "short",
    hour12: false,
  });

export const getWeekDayShortFormat = (date: Date) =>
  date.toLocaleString("en", { weekday: "short" });

export const getDayAndMonthLongFormat = (date: Date) =>
  date.toLocaleString("en", { month: "long", day: "numeric" });
