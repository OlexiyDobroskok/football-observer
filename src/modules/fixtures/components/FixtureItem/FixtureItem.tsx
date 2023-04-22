import { FixtureTeamResult } from "api/types/fixtures-types";
import { TeamCard } from "modules/fixtures/ui/TeamCard/TeamCard";
import {
  Scoreboard,
  ScoreboardProps,
} from "modules/fixtures/ui/Scoreboard/Scoreboard";
import { convertTimeToStrShortFormat } from "modules/fixtures/helpers/date-format";
import { Container } from "ui/Container/Container";
import classes from "./FixtureItem.module.scss";

export interface FixtureItemProps extends ScoreboardProps {
  date: string;
  teamsOfMatch: FixtureTeamResult;
  isEven?: boolean;
}

export const FixtureItem = ({
  date,
  teamsOfMatch: { home: homeTeam, away: awayTeam },
  matchScore,
  isEven,
}: FixtureItemProps) => {
  const matchDate = new Date(date);
  const matchTime = convertTimeToStrShortFormat(matchDate);
  const isScore = matchScore.home !== null && matchScore.away !== null;

  return (
    <Container className={[classes.fixture, isEven && classes.dark].join(" ")}>
      <TeamCard team={homeTeam} teamStatus={"HOME"} />
      <Container className={classes["match-status"]}>
        {isScore && <Scoreboard matchScore={matchScore} />}
        {!isScore && <p className={classes.time}>{matchTime}</p>}
      </Container>
      <TeamCard team={awayTeam} teamStatus={"AWAY"} />
    </Container>
  );
};
