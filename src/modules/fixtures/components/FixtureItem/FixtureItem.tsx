import { FixtureTeamResult } from "api/types/fixtures-types";
import { Container } from "ui/Container/Container";
import { FixturesAvailableStatus, fixturesStatus } from "api/helpers/consts";
import { Scoreboard, ScoreboardProps } from "../../ui/Scoreboard/Scoreboard";
import { getTimeShortFormat } from "../../helpers/date-format";
import { ListTeamMark } from "../../ui/ListTeamMark/ListTeamMark";
import classes from "./FixtureItem.module.scss";

export interface FixtureItemProps extends Pick<ScoreboardProps, "matchScore"> {
  date: string;
  matchStatus: FixturesAvailableStatus;
  teamsOfMatch: FixtureTeamResult;
  isEven?: boolean;
}

export const FixtureItem = ({
  date,
  teamsOfMatch: { home: homeTeam, away: awayTeam },
  matchScore,
  matchStatus,
  isEven,
}: FixtureItemProps) => {
  const matchDate = new Date(date);
  const matchTime =
    matchStatus === fixturesStatus.TBD
      ? `- : -`
      : getTimeShortFormat(matchDate);
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
    </Container>
  );
};
