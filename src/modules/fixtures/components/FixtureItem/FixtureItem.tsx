import { Link } from "react-router-dom";
import { FixtureTeamResult } from "api/types/fixtures-types";
import { Container } from "ui/Container/Container";
import { FixtureShortStatus, fixtureStatus } from "api/helpers/consts";
import { Scoreboard, ScoreboardProps } from "../../ui/Scoreboard/Scoreboard";
import { getTimeShortFormat } from "../../helpers/date-format";
import { ListTeamMark } from "../../ui/ListTeamMark/ListTeamMark";
import classes from "./FixtureItem.module.scss";

export interface FixtureItemProps extends Pick<ScoreboardProps, "matchScore"> {
  fixtureId: number;
  date: string;
  matchStatus: FixtureShortStatus;
  teamsOfMatch: FixtureTeamResult;
  isEven?: boolean;
}

export const FixtureItem = ({
  fixtureId,
  date,
  teamsOfMatch: { home: homeTeam, away: awayTeam },
  matchScore,
  matchStatus,
  isEven,
}: FixtureItemProps) => {
  const matchDate = new Date(date);
  const matchTime =
    matchStatus === fixtureStatus.TBD ? `- : -` : getTimeShortFormat(matchDate);
  const isScore = matchScore.home !== null && matchScore.away !== null;

  return (
    <Container className={[classes.fixture, isEven && classes.dark].join(" ")}>
      <ListTeamMark team={homeTeam} teamStatus={"HOME"} />
      <Container className={classes["match-status"]}>
        {isScore && <Scoreboard matchScore={matchScore} />}
        {!isScore && (
          <time dateTime={date} className={classes.time}>
            {matchTime}
          </time>
        )}
      </Container>
      <ListTeamMark team={awayTeam} teamStatus={"AWAY"} />
      <Link className={classes.link} to={`/fixtures/${fixtureId}`} />
    </Container>
  );
};
