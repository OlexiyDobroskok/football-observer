import { FixtureStatus } from "api/types/fixtures-types";
import { checkIsMatchLive } from "../../helpers/checkIsMatchLive";
import classes from "./MatchStatus.module.scss";

export interface MatchStatusProps {
  matchStatus: FixtureStatus;
}

export const MatchStatus = ({
  matchStatus: { short: matchStatus, elapsed: elapsedTime },
}: MatchStatusProps) => {
  const isLive = checkIsMatchLive(matchStatus);
  return (
    <div className={classes.matchInfo}>
      {isLive && (
        <>
          <span className={classes.time}>{`${elapsedTime}'`}</span>
          <span className={classes.status}>({matchStatus})</span>
        </>
      )}
      {!isLive && (
        <span className={classes.matchStatusLarge}>{matchStatus}</span>
      )}
    </div>
  );
};
