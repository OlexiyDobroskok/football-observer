import { FixtureTeamResult } from "api/types/fixtures-types";
import { ListTeamMark } from "modules/fixtures/ui/ListTeamMark/ListTeamMark";
import {
  Scoreboard,
  ScoreboardProps,
} from "modules/fixtures/ui/Scoreboard/Scoreboard";
import { getTimeShortFormat } from "modules/fixtures/helpers/date-format";
import { Container } from "ui/Container/Container";
import classes from "./FixtureItem.module.scss";

export interface FixtureItemProps extends Pick<ScoreboardProps, "matchScore"> {
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
  const matchTime = getTimeShortFormat(matchDate);
  const isScore = matchScore.home !== null && matchScore.away !== null;

  return (
    <Container className={[classes.fixture, isEven && classes.dark].join(" ")}>
      <ListTeamMark team={homeTeam} teamStatus={"HOME"} />
      <Container className={classes["match-status"]}>
        {isScore && <Scoreboard matchScore={matchScore} />}
        {!isScore && <p className={classes.time}>{matchTime}</p>}
      </Container>
      <ListTeamMark team={awayTeam} teamStatus={"AWAY"} />
    </Container>
  );
};
