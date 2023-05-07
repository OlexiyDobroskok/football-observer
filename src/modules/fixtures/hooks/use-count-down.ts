import { useEffect, useState } from "react";

export interface TimeToMatch {
  days: number;
  hrs: number;
  mins: number;
  secs: number;
  isStarted: boolean;
}

export const useCountDown = (eventDate: string): TimeToMatch => {
  const [timeToMatch, setTimeToMatch] = useState(0);

  useEffect(() => {
    const matchTime = new Date(eventDate).getTime();
    const intervalId = window.setInterval(() => {
      const timeNow = Date.now();
      const timeDiff = matchTime - timeNow;
      if (timeDiff <= 0) {
        setTimeToMatch(-1);
        clearInterval(intervalId);
      }
      if (timeDiff > 0) setTimeToMatch(timeDiff);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [eventDate]);

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;
  const sec = 1000;

  const daysToMatch = Math.floor(timeToMatch / day);
  const hoursToMatch = Math.floor((timeToMatch % day) / hour);
  const minutesToMatch = Math.floor((timeToMatch % hour) / minute);
  const secondsToMatch = Math.floor((timeToMatch % minute) / sec);

  return {
    days: daysToMatch,
    hrs: hoursToMatch,
    mins: minutesToMatch,
    secs: secondsToMatch,
    isStarted: timeToMatch < 0,
  };
};
