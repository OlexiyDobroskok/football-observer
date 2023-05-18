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
};
