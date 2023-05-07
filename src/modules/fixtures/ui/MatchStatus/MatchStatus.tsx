import { FixtureStatus } from "api/types/fixtures-types";
import classes from "./MatchStatus.module.scss";

export interface MatchStatusProps {
  matchStatus: FixtureStatus;
  isLive: boolean;
}

export const MatchStatus = ({
  matchStatus: { short: matchStatus, elapsed: elapsedTime },
  isLive,
}: MatchStatusProps) => (
  <div className={classes.container}>
    {isLive && (
      <>
        <p className={classes.time}>{`${elapsedTime}'`}</p>
        <p className={classes.status}>({matchStatus})</p>
      </>
    )}
    {!isLive && <p className={classes["status-lg"]}>{matchStatus}</p>}
  </div>
);
