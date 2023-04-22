import { FixtureGoals } from "api/types/fixtures-types";
import classes from "./Scoreboard.module.scss";

export interface ScoreboardProps {
  matchScore: FixtureGoals;
  boardSize?: "MD";
}

export const Scoreboard = ({
  matchScore: { home: homeTeamGoals, away: awayTeamGoals },
  boardSize,
}: ScoreboardProps) => (
  <p className={[classes.score, boardSize === "MD" && classes.md].join(" ")}>
    <span>{homeTeamGoals}</span> : <span>{awayTeamGoals}</span>
  </p>
);
