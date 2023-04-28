import { Fixture } from "api/types/fixtures-types";
import { Container } from "ui/Container/Container";
import { PreviewTeamMark } from "../../ui/PreviewTeamMark/PreviewTeamMark";
import { Scoreboard } from "../../ui/Scoreboard/Scoreboard";
import { MatchStatus } from "../../ui/MatchStatus/MatchStatus";
import { MatchDatePreview } from "../../ui/MatchDatePreview/MatchDatePreview";
import classes from "./FixturePreviewCard.module.scss";

export interface FixturePreviewCardProps {
  fixtureInfo: Fixture;
}

export const FixturePreviewCard = ({
  fixtureInfo: { fixture, league, teams, goals },
}: FixturePreviewCardProps) => {
  const { id: fixtureId, date, status } = fixture;
  const {
    name: leagueName,
    round: leagueRound,
    country: leagueCountry,
  } = league;
  const { home: homeTeam, away: awayTeam } = teams;

  const isMatchResult = goals.home !== null && goals.away !== null;

  return (
    <article className={classes.card}>
      <h3 className={classes.title}>{leagueName}</h3>
      <p className={classes.subtitle}>({leagueCountry})</p>
      <p className={classes.subtitle}>{leagueRound}</p>
      <Container className={classes["match-information"]}>
        <PreviewTeamMark team={homeTeam} />
        <Container className={classes["match-status"]}>
          {isMatchResult && <Scoreboard matchScore={goals} boardSize={"MD"} />}
          {status.elapsed && <MatchStatus matchStatus={status} />}
          {!status.elapsed && <MatchDatePreview date={date} />}
        </Container>
        <PreviewTeamMark team={awayTeam} />
      </Container>
    </article>
  );
};
