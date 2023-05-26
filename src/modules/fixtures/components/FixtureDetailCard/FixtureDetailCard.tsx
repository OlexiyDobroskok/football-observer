import { useFixtureDetail } from "../../hooks/use-fixture-detail";
import { RefereeInfo } from "../../ui/RefereeInfo/RefereeInfo";
import { StadiumInfo } from "../../ui/StadiumInfo/StadiumInfo";
import { Container } from "ui/Container/Container";
import {
  getDateMediumFormat,
  getTimeShortFormat,
  getValidDateTimeStrYMDFormat,
} from "../../helpers/date-format";
import { PreviewTeamMark } from "../../ui/PreviewTeamMark/PreviewTeamMark";
import { Scoreboard, scoreBoardSize } from "../../ui/Scoreboard/Scoreboard";
import { TimeToMatch } from "../../ui/TimeToMatch/TimeToMatch";
import { MatchStatus } from "../../ui/MatchStatus/MatchStatus";
import { MatchGoals } from "../MatchGoals/MatchGoals";
import { MatchGoalsAssist } from "../MatchGoalsAssist/MatchGoalsAssist";
import classes from "./FixtureDetailCard.module.scss";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { MatchRedCards } from "../MatchRedCards/MatchRedCards";

export const FixtureDetailCard = () => {
  const { fixtureDetail, fixtureEventsAlt, isScheduled } = useFixtureDetail();

  if (fixtureDetail && fixtureEventsAlt) {
    const { fixture, teams, goals } = fixtureDetail;
    const { date, referee, venue, status, periods } = fixture;
    const { home: homeTeam, away: awayTeam } = teams;
    const { homeTeamEvents, awayTeamEvents } = fixtureEventsAlt;
    const isGoalEvents =
      !!homeTeamEvents.goals.length && !!awayTeamEvents.goals.length;
    const isRedCardEvents =
      !!homeTeamEvents.redCards.length && !!awayTeamEvents.redCards.length;
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
                <Scoreboard matchScore={goals} boardSize={scoreBoardSize.lg} />
                <MatchStatus matchStatus={status} periods={periods} />
              </>
            )}
            {isScheduled && <TimeToMatch fixtureDate={date} />}
          </div>
          <PreviewTeamMark team={awayTeam} />
        </Container>
        <p className={classes.fixtureStartTime}>{`Kick Off: ${matchTime}`}</p>
        <section className={classes.fixtureEvents}>
          <HiddenElement as={"h3"}>Match Events</HiddenElement>
          <div className="goalEvents">
            <MatchGoals />
          </div>
          {isGoalEvents && (
            <div className="assistEvents">
              <p className={classes.eventTitle}>Assists</p>
              <MatchGoalsAssist />
            </div>
          )}
          {isRedCardEvents && (
            <div className="redCardEvents">
              <p className={classes.eventTitle}>Red Cards</p>
              <MatchRedCards />
            </div>
          )}
        </section>
      </div>
    );
  }

  return <div>Not Found!</div>;
};
