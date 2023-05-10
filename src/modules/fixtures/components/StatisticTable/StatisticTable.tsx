import { ListTeamMark } from "../../ui/ListTeamMark/ListTeamMark";
import { StatisticScale } from "../StatistiсScale/StatisticScale";
import { FixtureTeam, GameStatistics } from "api/types/fixtures-types";
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
  const statisticRows = statisticFields.map((fieldName) => (
    <tr key={fieldName.toString()} className={classes["stat-row"]}>
      <td>
        <div className={classes["home-data"]}>
          <div className={classes.scale}>
            <StatisticScale
              homeTeamValue={homeTeamStats[fieldName]}
              awayTeamValue={awayTeamStats[fieldName]}
              teamLocation={"HOME"}
            />
          </div>
          <span className={classes.value}>{homeTeamStats[fieldName]}</span>
        </div>
      </td>
      <th className={classes["table-header"]}>{fieldName.toString()}</th>
      <td>
        <div className={classes["away-data"]}>
          <span className={classes.value}>{awayTeamStats[fieldName]}</span>
          <div className={classes.scale}>
            <StatisticScale
              homeTeamValue={homeTeamStats[fieldName]}
              awayTeamValue={awayTeamStats[fieldName]}
              teamLocation={"AWAY"}
            />
          </div>
        </div>
      </td>
    </tr>
  ));

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th className={classes["home-team"]}>
            <ListTeamMark team={homeTeam} teamStatus={"HOME"} />
          </th>
          <th>{statisticName}</th>
          <th className={classes["away-team"]}>
            <ListTeamMark team={awayTeam} teamStatus={"AWAY"} />
          </th>
        </tr>
      </thead>
      <tbody>{statisticRows}</tbody>
    </table>
  );
};
