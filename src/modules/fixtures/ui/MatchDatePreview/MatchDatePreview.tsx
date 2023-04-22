import {
  getDayAndMonthLongFormat,
  getTimeShortFormat,
  getWeekDayShortFormat,
} from "modules/fixtures/helpers/date-format";
import classes from "./MatchDatePreview.module.scss";

export interface MatchDatePreviewProps {
  date: string;
}

export const MatchDatePreview = ({ date }: MatchDatePreviewProps) => {
  const matchDate = new Date(date);
  const matchDay = getWeekDayShortFormat(matchDate);
  const matchDayAndMonth = getDayAndMonthLongFormat(matchDate);
  const formattedTime = getTimeShortFormat(matchDate);

  return (
    <div className={classes.container}>
      <p className={classes.time}>{formattedTime}</p>
      <p className={classes.day}>{matchDay}</p>
      <p className={classes.month}>{matchDayAndMonth}</p>
    </div>
  );
};
