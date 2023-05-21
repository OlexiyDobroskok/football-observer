import { useFixtureDetail } from "../../hooks/use-fixture-detail";
import { StatisticTable } from "../StatisticTable/StatisticTable";
import classes from "./MatchStatistic.module.scss";

export const MatchStatistic = () => {
  const { fixtureDetail } = useFixtureDetail();

  if (fixtureDetail && fixtureDetail.statistics.length) {
    const { statistics, teams } = fixtureDetail;
    const { home: homeTeam, away: awayTeam } = teams;
    const [homeTeamStat, awayTeamStat] = statistics;

    return (
      <section className={classes.matchStatistic}>
        <h3 className={classes.title}>Match Statistics</h3>
        <StatisticTable
          statisticName={""}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeTeamStats={homeTeamStat.statistics}
          awayTeamStats={awayTeamStat.statistics}
        />
      </section>
    );
  }

  if (fixtureDetail && !fixtureDetail.statistics.length) {
    return (
      <section className={classes.matchStatistic}>
        <h3 className={classes.title}>Match Statistics</h3>
        <p className={classes.message}>
          Match stats will appear once the match has kicked off.
        </p>
      </section>
    );
  }

  return <p className={classes.message}>Not Found!</p>;
};
