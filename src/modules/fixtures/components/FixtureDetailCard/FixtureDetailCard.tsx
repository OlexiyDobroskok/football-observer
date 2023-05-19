import { useFixtureDetail } from "../../hooks/use-fixture-detail";
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
  const { fixtureDetail, isScheduled } = useFixtureDetail();

  if (fixtureDetail) {
    const { fixture, teams, goals, events } = fixtureDetail;
    const { date, referee, venue, status } = fixture;
    const { home: homeTeam, away: awayTeam } = teams;
    const matchDate = new Date(date);
    const matchDateFormatted = getDateMediumFormat(matchDate);
    const matchTime = getTimeShortFormat(matchDate);
    return (
      <div className={classes.fixture}>
        <Container className={classes.fixtureCommonInfo}>
          <div className={classes.commonInfoWrap}>
            <div className={classes.date}>
              <time dateTime={getValidDateTimeStrYMDFormat(matchDate)}>
                {matchDateFormatted}
              </time>
            </div>
            {!!referee && <RefereeInfo refereeName={referee} />}
          </div>
          <StadiumInfo stadium={venue} />
        </Container>
        <Container className={classes.fixtureScore}>
          <PreviewTeamMark team={homeTeam} />
          <div className={classes.scoreboard}>
            {!isScheduled && (
              <>
                <Scoreboard matchScore={goals} boardSize={"LG"} />
                <MatchStatus matchStatus={status} />
              </>
            )}
            {isScheduled && <TimeToMatch fixtureDate={date} />}
          </div>
          <PreviewTeamMark team={awayTeam} />
        </Container>
        {isScheduled && (
          <p className={classes.fixtureStartTime}>{`Kick Off: ${matchTime}`}</p>
        )}
        <Container className={classes.fixtureEvents}>
          <TeamEvents eventsDefinition={events.homeTeam} />
          <TeamEvents eventsDefinition={events.awayTeam} />
        </Container>
      </div>
    );
  }

  return <div>Not Found!</div>;
};
