import { Fixture } from "api/types/fixtures-types";
import { FixturePreviewCard } from "modules/fixtures/components/FixturePreviewCard/FixturePreviewCard";
import classes from "./LiveMatchesList.module.scss";

export interface LiveMatchesListProps {
  liveMatches: Fixture[];
}

export const LiveMatchesList = ({ liveMatches }: LiveMatchesListProps) => {
  const matchesList = liveMatches.map((matchInfo) => (
    <div className={classes.card} key={matchInfo.fixture.id}>
      <FixturePreviewCard fixtureInfo={matchInfo} />
    </div>
  ));

  return (
    <div className={classes.container}>
      <div className={classes.list}>{matchesList}</div>
    </div>
  );
};
