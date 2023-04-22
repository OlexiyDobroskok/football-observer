export const convertDateToStrLgFormat = (date: Date) =>
  date.toLocaleString("en", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const convertDateToStrShortFormat = (date: Date) =>
  date.toLocaleString("en", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const convertTimeToStrShortFormat = (date: Date) =>
  date.toLocaleString("en", {
    timeStyle: "short",
    hour12: false,
  });
