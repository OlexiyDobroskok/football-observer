import { FixtureGoals } from "api/types/fixtures-types";
import classes from "./Scoreboard.module.scss";

export interface ScoreboardProps {
  matchScore: FixtureGoals;
}

export const Scoreboard = ({
  matchScore: { home: homeTeamGoals, away: awayTeamGoals },
}: ScoreboardProps) => (
  <p className={classes.score}>
    <span>{homeTeamGoals}</span> : <span>{awayTeamGoals}</span>
  </p>
);
