import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchFixtures } from "../../store/fixtures-thunk";
import { FixturePreviewCard } from "../FixturePreviewCard/FixturePreviewCard";
import { Fixture } from "src/api/types/fixtures-types";
import { MatchesType } from "../../types/types";
import classes from "./PreviewMatchesList.module.scss";

export interface PreviewMatchesListProps {
  matchesType: MatchesType;
  matchesLimit?: number;
}

export const PreviewMatchesList = ({
  matchesType,
  matchesLimit,
}: PreviewMatchesListProps) => {
  const { currentLeagueId, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const { liveMatches, finishedMatches, scheduledMatches } = useAppSelector(
    ({ fixtures }) => fixtures
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentLeagueId && currentSeason)
      dispatch(
        fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
      );
  }, [currentLeagueId, currentSeason]);

  if (liveMatches && finishedMatches && scheduledMatches) {
    const isLive = matchesType === "LIVE";
    const isScheduled = matchesType === "SCHEDULED";
    const isFinished = matchesType === "FINISHED";
    let previewMatches: Fixture[] = [];

    if (isLive && liveMatches.length) {
      previewMatches = liveMatches;
    }

    if (isScheduled && scheduledMatches.length) {
      const [upcomingMatchDay] = scheduledMatches;
      previewMatches = upcomingMatchDay.fixtures;
    }

    if (isFinished && finishedMatches.length) {
      const [latestMatchDay] = finishedMatches;
      previewMatches = latestMatchDay.fixtures;
    }

    const emptyMessage = isFinished
      ? "Sorry, no matches were played..."
      : isScheduled
      ? "Sorry, there are no scheduled matches..."
      : "Sorry, there is not a single live match...";

    const matchesList = previewMatches
      .slice(0, matchesLimit)
      .map((matchInfo) => (
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
          {!matchesList.length && (
            <p className={classes.message}>{emptyMessage}</p>
          )}
        </div>
      </div>
    );
  }

  return <p className={classes.message}>Sorry, Matches Not Found...</p>;
};
