import { LineupTeam, ShapeColor } from "api/types/fixtures-types";
import { PlayerLines } from "../../types/types";
import { locationStatus, LocationStatus } from "api/helpers/consts";
import classes from "./FormationLines.module.scss";

export interface FormationLinesProps {
  team: LineupTeam;
  positionLines: PlayerLines;
  teamLocationStatus?: LocationStatus;
}

export const FormationLines = ({
  team,
  positionLines,
  teamLocationStatus = locationStatus.home,
}: FormationLinesProps) => {
  const isAwayTeam = teamLocationStatus === locationStatus.away;

  const { colors: teamColors } = team;
  const goalkeeperColors: ShapeColor = {
    number: teamColors ? `#${teamColors.goalkeeper.number}` : "#fff",
    border: teamColors ? `#${teamColors.goalkeeper.border}` : "#fff",
    primary: teamColors ? `#${teamColors.goalkeeper.primary}` : "",
  };

  const playerColors: ShapeColor = {
    number: teamColors ? `#${teamColors.player.number}` : "#fff",
    border: teamColors ? `#${teamColors.player.border}` : "#fff",
    primary: teamColors ? `#${teamColors.player.primary}` : "",
  };

  const teamLines = Object.keys(positionLines) as (keyof PlayerLines)[];

  const teamLineUp = teamLines.map((line) => {
    const isGoalkeeper = line === "first";
    const linePlayers = positionLines[line].map(({ number }) => (
      <div
        key={`${team.id}${number}`}
        className={classes.linePlayer}
        style={{
          color: `${
            isGoalkeeper ? goalkeeperColors.number : playerColors.number
          }`,
          border: `2px solid ${
            isGoalkeeper ? goalkeeperColors.border : playerColors.border
          }`,
          backgroundColor: `${
            isGoalkeeper ? goalkeeperColors.primary : playerColors.primary
          }`,
        }}
      >
        {number}
      </div>
    ));
    const lineClassName = [
      classes.line,
      isAwayTeam ? classes.lineReverse : "",
    ].join(" ");

    return (
      <div key={`${team.id}${line}`} className={lineClassName}>
        {linePlayers}
      </div>
    );
  });

  return <>{teamLineUp}</>;
};
