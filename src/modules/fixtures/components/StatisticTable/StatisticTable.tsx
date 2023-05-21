import { ListTeamMark } from "../../ui/ListTeamMark/ListTeamMark";
import { StatisticScale } from "../../ui/StatistiсScale/StatisticScale";
import { FixtureTeam } from "api/types/fixtures-types";
import { GameStatistic } from "api/types/global";
import { getStatisticScalePercent } from "helpers/get-statistic-scale-percent";
import { locationStatus } from "api/helpers/consts";
import classes from "./StatisticTable.module.scss";

export interface StatisticTableProps<T extends GameStatistic> {
  statisticName: string;
  homeTeam: FixtureTeam;
  awayTeam: FixtureTeam;
  homeTeamStats: T[];
  awayTeamStats: T[];
}

export const StatisticTable = <T extends GameStatistic>({
  statisticName,
  homeTeam,
  awayTeam,
  homeTeamStats,
  awayTeamStats,
}: StatisticTableProps<T>) => {
  const statisticFields = homeTeamStats.map((stat) => stat.type);
  const statisticRows = statisticFields.map((statisticType) => {
    const [{ value: homeTeamValue }] = homeTeamStats.filter(
      (stat) => stat.type === statisticType
    );
    const [{ value: awayTeamValue }] = awayTeamStats.filter(
      (stat) => stat.type === statisticType
    );
    const { homeTeamPercent, awayTeamPercent } = getStatisticScalePercent({
      homeTeamValue,
      awayTeamValue,
    });
    return (
      <tr key={statisticType}>
        <td>
          <div className={classes.homeData}>
            <div className={classes.scale}>
              <StatisticScale
                width={homeTeamPercent}
                teamLocationStatus={locationStatus.home}
              />
            </div>
            <span className={classes.value}>
              {homeTeamValue ? homeTeamValue : 0}
            </span>
          </div>
        </td>
        <th className={classes.tableHeader}>{statisticType}</th>
        <td>
          <div className={classes.awayData}>
            <span className={classes.value}>
              {awayTeamValue ? awayTeamValue : 0}
            </span>
            <div className={classes.scale}>
              <StatisticScale
                width={awayTeamPercent}
                teamLocationStatus={locationStatus.away}
              />
            </div>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th className={classes.homeTeam}>
            <ListTeamMark team={homeTeam} teamStatus={locationStatus.home} />
          </th>
          <th>{statisticName}</th>
          <th className={classes.awayTeam}>
            <ListTeamMark team={awayTeam} teamStatus={locationStatus.away} />
          </th>
        </tr>
      </thead>
      <tbody>{statisticRows}</tbody>
    </table>
  );
};
