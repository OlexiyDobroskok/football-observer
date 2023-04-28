import { FixturePreviewCard } from "modules/fixtures/components/FixturePreviewCard/FixturePreviewCard";
import { Fixture } from "src/api/types/fixtures-types";
import classes from "./PreviewMatchesList.module.scss";

export interface PreviewMatchesListProps {
  matches: Fixture[];
  matchesLimit?: number;
}

export const PreviewMatchesList = ({
  matches,
  matchesLimit,
}: PreviewMatchesListProps) => {
  const matchesList = matches.slice(0, matchesLimit).map((matchInfo) => (
    <div className={classes.card} key={matchInfo.fixture.id}>
      <FixturePreviewCard fixtureInfo={matchInfo} />
    </div>
  ));

  const isSingle = matchesList.length === 1;

  return (
    <div className={classes.container}>
      <div
        className={[classes.list, isSingle && classes["single-match"]].join(
          " "
        )}
      >
        {matchesList}
      </div>
    </div>
  );
};
