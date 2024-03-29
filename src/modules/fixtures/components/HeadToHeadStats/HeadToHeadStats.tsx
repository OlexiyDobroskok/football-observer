import { useHeadToHead } from "../../hooks/use-head-to-head";
import { useAppSelector } from "hooks/redux";
import { StatisticTable } from "../StatisticTable/StatisticTable";
import classes from "./HeadToHeadStats.module.scss";

export const HeadToHeadStats = () => {
  const { headToHeadStats } = useHeadToHead();
  const { fixtureDetail } = useAppSelector(
    ({ fixtureDetail }) => fixtureDetail
  );

  if (headToHeadStats && fixtureDetail) {
    const { played, draws, homeTeamWinStats, awayTeamWinStats } =
      headToHeadStats;

    const {
      teams: { home: homeTeam, away: awayTeam },
    } = fixtureDetail;

    if (played === 0)
      return (
        <section>
          <h3 className={classes.title}>Head-to-Head</h3>
          <p className={classes.message}>The teams have not met in the past.</p>
        </section>
      );

    return (
      <section className={classes.h2HStats}>
        <h3 className={classes.title}>Head-to-Head</h3>
        {played === 1 && (
          <p className={classes.common}>
            <span className={classes.total}>{played}</span>
            <span className={classes.description}>(Recent Match)</span>
          </p>
        )}
        {played > 1 && (
          <p className={classes.common}>
            <span className={classes.total}>{played}</span>
            <span className={classes.description}>(Recent Matches)</span>
          </p>
        )}
        <p className={classes.common}>
          <span className={classes.draws}>{draws}</span>
          <span className={classes.description}>(Draws)</span>
        </p>
        <div>
          <StatisticTable
            statisticName={"Wins"}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            homeTeamStats={homeTeamWinStats}
            awayTeamStats={awayTeamWinStats}
          />
        </div>
      </section>
    );
  }

  return <div>Not Found!</div>;
};
