import { useAppSelector } from "hooks/redux";
import { TeamEvents } from "../TeamEvents/TeamEvents";
import { RefereeInfo } from "../../ui/RefereeInfo/RefereeInfo";
import { StadiumInfo } from "../../ui/StadiumInfo/StadiumInfo";
import { Container } from "ui/Container/Container";
import {
  getDateMediumFormat,
  getTimeShortFormat,
  getValidDateTimeStrYMDFormat,
} from "../../helpers/date-format";
import { PreviewTeamMark } from "../../ui/PreviewTeamMark/PreviewTeamMark";
import { Scoreboard } from "../../ui/Scoreboard/Scoreboard";
import { TimeToMatch } from "../../ui/TimeToMatch/TimeToMatch";
import { MatchStatus } from "../../ui/MatchStatus/MatchStatus";
import classes from "./FixtureDetailCard.module.scss";

export const FixtureDetailCard = () => {
  const { fixtureDetail, isLive, isScheduled } = useAppSelector(
    ({ fixtureDetail }) => fixtureDetail
  );

  if (fixtureDetail) {
    const { fixture, teams, goals, events } = fixtureDetail;
    const { date, referee, venue, status } = fixture;
    const { home: homeTeam, away: awayTeam } = teams;
    const matchDate = new Date(date);
    const matchDateFormatted = getDateMediumFormat(matchDate);
    const matchTime = getTimeShortFormat(matchDate);
    return (
      <div className={classes.fixture}>
        <Container className={classes["common-info"]}>
          <p className={classes.date}>
            <time dateTime={getValidDateTimeStrYMDFormat(matchDate)}>
              {matchDateFormatted}
            </time>
          </p>
          {!!referee && (
            <div className={classes.referee}>
              <RefereeInfo refereeName={referee} />
            </div>
          )}
          <StadiumInfo stadium={venue} />
        </Container>
        <Container className={classes.score}>
          <PreviewTeamMark team={homeTeam} />
          <div className={classes.scoreboard}>
            {!isScheduled && (
              <>
                <Scoreboard matchScore={goals} boardSize={"LG"} />
                <MatchStatus matchStatus={status} isLive={isLive} />
              </>
            )}
            {isScheduled && <TimeToMatch fixtureDate={date} />}
          </div>
          <PreviewTeamMark team={awayTeam} />
        </Container>
        {isScheduled && (
          <p className={classes["match-time"]}>{`Kick Off: ${matchTime}`}</p>
        )}
        <Container className={classes["match-events"]}>
          <TeamEvents eventsDefinition={events.homeTeam} />
          <TeamEvents eventsDefinition={events.awayTeam} />
        </Container>
      </div>
    );
  }

  return <div>Not found</div>;
};