import { Fixture } from "api/types/fixtures-types";
import { FixturePreviewCard } from "../../ui/FixturePreviewCard/FixturePreviewCard";
import { PreviewTeamMark } from "../../ui/PreviewTeamMark/PreviewTeamMark";
import { Container } from "ui/Container/Container";
import { Scoreboard, scoreBoardSize } from "../../ui/Scoreboard/Scoreboard";
import { MatchStatus } from "../../ui/MatchStatus/MatchStatus";
import classes from "./FinishedMatchPreview.module.scss";

export interface FinishedMatchPreviewProps {
  matchInfo: Fixture;
}

export const FinishedMatchPreview = ({
  matchInfo: { fixture, league, goals, teams },
}: FinishedMatchPreviewProps) => {
  const { id, status, periods } = fixture;
  const { home: homeTeam, away: awayTeam } = teams;

  return (
    <FixturePreviewCard fixtureId={id} leagueInfo={league}>
      <Container className={classes.matchInfo}>
        <PreviewTeamMark team={homeTeam} />
        <Container className={classes.matchScore}>
          <Scoreboard matchScore={goals} boardSize={scoreBoardSize.md} />
          <MatchStatus matchStatus={status} periods={periods} />
        </Container>
        <PreviewTeamMark team={awayTeam} />
      </Container>
    </FixturePreviewCard>
  );
};
