const getFormattedDate = (date: Date, opt: Intl.DateTimeFormatOptions) =>
  date.toLocaleString("en", opt);

const getWeekDayLF = (date: Date) =>
  getFormattedDate(date, { weekday: "long" });

const getMonthLF = (date: Date) => getFormattedDate(date, { month: "long" });

const getMonthSF = (date: Date) => getFormattedDate(date, { month: "2-digit" });

const getMonthDaySF = (date: Date) =>
  getFormattedDate(date, { day: "numeric" });

const getMonthDayLF = (date: Date) =>
  getFormattedDate(date, { day: "2-digit" });

export const getWeekDayShortFormat = (date: Date) =>
  getFormattedDate(date, { weekday: "short" });

export const getDayAndMonthLongFormat = (date: Date) =>
  getFormattedDate(date, { month: "long", day: "numeric" });

export const getTimeShortFormat = (date: Date) =>
  getFormattedDate(date, {
    timeStyle: "short",
    hour12: false,
  });

export const getDateLongFormat = (date: Date) =>
  `${getWeekDayLF(date)} ${getMonthDaySF(date)} ${getMonthLF(
    date
  )} ${date.getFullYear()}`;

export const getValidDateTimeStrYMDFormat = (date: Date) =>
  `${date.getFullYear()}-${getMonthSF(date)}-${getMonthDayLF(date)}`;
