import { FixtureStatus } from "api/types/fixtures-types";
import classes from "./MatchStatus.module.scss";

export interface MatchStatusProps {
  matchStatus: FixtureStatus;
}

export const MatchStatus = ({
  matchStatus: { short: statusDescription, elapsed: elapsedTime },
}: MatchStatusProps) => (
  <div className={classes.container}>
    {elapsedTime && <p className={classes.time}>{`${elapsedTime}'`}</p>}
    <p className={classes.status}>({statusDescription})</p>
  </div>
);
