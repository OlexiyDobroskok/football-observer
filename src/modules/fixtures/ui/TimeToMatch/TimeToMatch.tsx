import { twoDigitsFormat } from "../../helpers/date-format";
import { useCountDown } from "../../hooks/use-count-down";
import classes from "./TimeToMatch.module.scss";

export interface TimeToMatchProps {
  fixtureDate: string;
}

export const TimeToMatch = ({ fixtureDate }: TimeToMatchProps) => {
  const downCounter = useCountDown(fixtureDate);

  if (downCounter) {
    const { days, hrs, mins, secs } = downCounter;
    return (
      <div className={classes["count-down"]}>
        <div className={classes.count}>
          <div className={classes.digits}>{twoDigitsFormat(days)}</div>
          <div className={classes.description}>Days</div>
        </div>
        <div className={classes.count}>
          <div className={classes.digits}>{twoDigitsFormat(hrs)}</div>
          <div className={classes.description}>Hrs</div>
        </div>
        <div className={classes.count}>
          <div className={classes.digits}>{twoDigitsFormat(mins)}</div>
          <div className={classes.description}>Mins</div>
        </div>
        <div className={classes.count}>
          <div className={classes.digits}>{twoDigitsFormat(secs)}</div>
          <div className={classes.description}>Secs</div>
        </div>
      </div>
    );
  }
  return <p className={classes.description}>Match is Started!</p>;
};
