import { useEffect, useState } from "react";
import { getTimeToMatch } from "../helpers/get-time-to-match";

export interface TimeToMatch {
  days: number;
  hrs: number;
  mins: number;
  secs: number;
}

export const useCountDown = (eventDate: string): TimeToMatch | null => {
  const [timeToMatch, setTimeToMatch] = useState(() =>
    getTimeToMatch(eventDate)
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const timeDiff = getTimeToMatch(eventDate);
      setTimeToMatch(timeDiff);
      if (!timeDiff) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [eventDate]);

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;
  const sec = 1000;

  if (timeToMatch) {
    const daysToMatch = Math.floor(timeToMatch / day);
    const hoursToMatch = Math.floor((timeToMatch % day) / hour);
    const minutesToMatch = Math.floor((timeToMatch % hour) / minute);
    const secondsToMatch = Math.floor((timeToMatch % minute) / sec);

    return {
      days: daysToMatch,
      hrs: hoursToMatch,
      mins: minutesToMatch,
      secs: secondsToMatch,
    };
  }
  return null;
};
