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
      <time dateTime={date} className={classes.time}>
        {formattedTime}
      </time>
      <time dateTime={date} className={classes.day}>
        {matchDay}
      </time>
      <time dateTime={date} className={classes.month}>
        {matchDayAndMonth}
      </time>
    </div>
  );
};
