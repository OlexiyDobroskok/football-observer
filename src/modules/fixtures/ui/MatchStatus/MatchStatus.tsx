import { FixturePeriods, FixtureStatus } from "api/types/fixtures-types";
import { checkIsMatchLive } from "../../helpers/check-is-match-live";
import { fixtureStatus } from "api/helpers/consts";
import { getExtraMinute } from "../../helpers/get-extra-minute";
import classes from "./MatchStatus.module.scss";

export interface MatchStatusProps {
  matchStatus: FixtureStatus;
  periods: FixturePeriods;
}

export const MatchStatus = ({
  matchStatus: { short: matchStatus, elapsed: elapsedTime },
  periods,
}: MatchStatusProps) => {
  const isLive = checkIsMatchLive(matchStatus);
  const isFirstTime =
    !!periods.first &&
    matchStatus.toLowerCase() === fixtureStatus["1H"].toLowerCase();
  const isSecondTime =
    !!periods.second &&
    matchStatus.toLowerCase() === fixtureStatus["2H"].toLowerCase();
  const isHalfTime =
    matchStatus.toLowerCase() === fixtureStatus.HT.toLowerCase();
  const firstPeriodExtraTime = getExtraMinute({
    periodStartTime: periods.first,
  });
  const secondPeriodExtraTime = getExtraMinute({
    periodStartTime: periods.first,
  });

  const matchTime =
    isFirstTime && firstPeriodExtraTime
      ? `${elapsedTime}'+${firstPeriodExtraTime}'`
      : isSecondTime && secondPeriodExtraTime
      ? `${elapsedTime}'+${secondPeriodExtraTime}'`
      : `${elapsedTime}'`;

  return (
    <div className={classes.matchInfo}>
      {isLive && (
        <>
          {!isHalfTime && <span className={classes.time}>{matchTime}</span>}
          <span className={classes.status}>({matchStatus})</span>
        </>
      )}
      {!isLive && (
        <span className={classes.matchStatusLarge}>{matchStatus}</span>
      )}
    </div>
  );
};
