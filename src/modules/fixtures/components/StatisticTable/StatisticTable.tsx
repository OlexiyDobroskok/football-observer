import { ListTeamMark } from "../../ui/ListTeamMark/ListTeamMark";
import { StatisticScale } from "../../ui/StatistiсScale/StatisticScale";
import { FixtureTeam } from "api/types/fixtures-types";
import { GameStatistics } from "api/types/global";
import { getStatisticScalePercent } from "helpers/get-statistic-scale-percent";
import classes from "./StatisticTable.module.scss";

export interface StatisticTableProps<T extends GameStatistics> {
  statisticName: string;
  homeTeam: FixtureTeam;
  awayTeam: FixtureTeam;
  homeTeamStats: T;
  awayTeamStats: T;
}

export const StatisticTable = <T extends GameStatistics>({
  statisticName,
  homeTeam,
  awayTeam,
  homeTeamStats,
  awayTeamStats,
}: StatisticTableProps<T>) => {
  const statisticFields = Object.keys(homeTeamStats) as (keyof T)[];
  const statisticRows = statisticFields.map((fieldName) => {
    const { homeTeamPercent, awayTeamPercent } = getStatisticScalePercent({
      homeTeamValue: homeTeamStats[fieldName],
      awayTeamValue: awayTeamStats[fieldName],
    });
    return (
      <tr key={fieldName.toString()}>
        <td>
          <div className={classes.homeData}>
            <div className={classes.scale}>
              <StatisticScale
                width={homeTeamPercent}
                teamLocationStatus={"HOME"}
              />
            </div>
            <span className={classes.value}>{homeTeamStats[fieldName]}</span>
          </div>
        </td>
        <th className={classes.tableHeader}>{fieldName.toString()}</th>
        <td>
          <div className={classes.awayData}>
            <span className={classes.value}>{awayTeamStats[fieldName]}</span>
            <div className={classes.scale}>
              <StatisticScale
                width={awayTeamPercent}
                teamLocationStatus={"AWAY"}
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
            <ListTeamMark team={homeTeam} teamStatus={"HOME"} />
          </th>
          <th>{statisticName}</th>
          <th className={classes.awayTeam}>
            <ListTeamMark team={awayTeam} teamStatus={"AWAY"} />
          </th>
        </tr>
      </thead>
      <tbody>{statisticRows}</tbody>
    </table>
  );
};
