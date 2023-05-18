import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { resetFixturesReqStatus } from "../../store/fixtures-slice";
import { fetchFixtures } from "../../store/fixtures-thunk";
import { LiveMatchPreview } from "../LiveMatchPreview/LiveMatchPreview";
import classes from "./LiveMatchesPreviewList.module.scss";

export const LiveMatchesPreviewList = () => {
  const { currentLeagueId, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const { liveMatches, isLiveMatches } = useAppSelector(
    ({ fixtures }) => fixtures
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    let intervalId: number | null = null;

    if (currentLeagueId && currentSeason) {
      dispatch(
        fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
      );

      if (isLiveMatches) {
        intervalId = window.setInterval(() => {
          dispatch(resetFixturesReqStatus());
          dispatch(
            fetchFixtures({
              leagueId: currentLeagueId,
              season: currentSeason,
            })
          );
        }, 30000);
      }
    }

    return () => {
      if (isLiveMatches) dispatch(resetFixturesReqStatus());
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [currentLeagueId, currentSeason, isLiveMatches]);

  if (liveMatches) {
    const previewList = liveMatches.map((liveMatchInfo) => (
      <div className={classes.previewCard} key={liveMatchInfo.fixture.id}>
        <LiveMatchPreview matchInfo={liveMatchInfo} />
      </div>
    ));

    const isSingleMatch = previewList.length === 1;

    return (
      <section className={classes.preview}>
        <h2 className={classes.previewTitle}>Live</h2>
        {!!previewList.length && (
          <div
            className={[
              classes.previewList,
              isSingleMatch && classes.single,
            ].join(" ")}
          >
            {previewList}
          </div>
        )}
        {!previewList.length && (
          <p className={classes.message}>
            Sorry, there is not a single live match...
          </p>
        )}
      </section>
    );
  }

  return <p className={classes.message}>Sorry, Matches Not Found...</p>;
};
