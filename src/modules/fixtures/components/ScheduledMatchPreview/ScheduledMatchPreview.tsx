import { Fixture } from "api/types/fixtures-types";
import { FixturePreviewCard } from "../../ui/FixturePreviewCard/FixturePreviewCard";
import { Container } from "ui/Container/Container";
import { PreviewTeamMark } from "../../ui/PreviewTeamMark/PreviewTeamMark";
import { MatchDatePreview } from "../../ui/MatchDatePreview/MatchDatePreview";
import classes from "./ScheduledMatchPreview.module.scss";

export interface ScheduledMatchPreviewProps {
  matchInfo: Fixture;
}

export const ScheduledMatchPreview = ({
  matchInfo: { fixture, league, teams },
}: ScheduledMatchPreviewProps) => {
  const { id, date } = fixture;
  const { home: homeTeam, away: awayTeam } = teams;

  return (
    <FixturePreviewCard fixtureId={id} leagueInfo={league}>
      <Container className={classes.matchInfo}>
        <PreviewTeamMark team={homeTeam} />
        <MatchDatePreview date={date} />
        <PreviewTeamMark team={awayTeam} />
      </Container>
    </FixturePreviewCard>
  );
};
