import { FixtureGoals } from "api/types/fixtures-types";
import classes from "./Scoreboard.module.scss";

export const scoreBoardSize = {
  md: "MD",
  lg: "LG",
} as const;

export type BoardSize = (typeof scoreBoardSize)[keyof typeof scoreBoardSize];

export interface ScoreboardProps {
  matchScore: FixtureGoals;
  boardSize?: BoardSize;
}

export const Scoreboard = ({
  matchScore: { home: homeTeamGoals, away: awayTeamGoals },
  boardSize,
}: ScoreboardProps) => {
  const scoreClassName = [
    classes.score,
    boardSize === "MD" ? classes.md : boardSize === "LG" ? classes.lg : "",
  ].join(" ");

  return (
    <p className={scoreClassName}>
      <span>{homeTeamGoals}</span> : <span>{awayTeamGoals}</span>
    </p>
  );
};
