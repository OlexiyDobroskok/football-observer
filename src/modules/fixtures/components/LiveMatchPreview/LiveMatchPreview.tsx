import { Fixture } from "api/types/fixtures-types";
import { FixturePreviewCard } from "../../ui/FixturePreviewCard/FixturePreviewCard";
import { Container } from "ui/Container/Container";
import { PreviewTeamMark } from "../../ui/PreviewTeamMark/PreviewTeamMark";
import { Scoreboard } from "../../ui/Scoreboard/Scoreboard";
import { MatchStatus } from "../../ui/MatchStatus/MatchStatus";
import classes from "./LiveMatchPreview.module.scss";

export interface LiveMatchPreviewProps {
  matchInfo: Fixture;
}

export const LiveMatchPreview = ({
  matchInfo: { fixture, league, goals, teams },
}: LiveMatchPreviewProps) => {
  const { id, status } = fixture;
  const { home: homeTeam, away: awayTeam } = teams;

  return (
    <FixturePreviewCard fixtureId={id} leagueInfo={league}>
      <Container className={classes.matchInfo}>
        <PreviewTeamMark team={homeTeam} />
        <Container className={classes.matchScore}>
          <Scoreboard matchScore={goals} boardSize={"MD"} />
          <MatchStatus matchStatus={status} />
        </Container>
        <PreviewTeamMark team={awayTeam} />
      </Container>
    </FixturePreviewCard>
  );
};
