import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchFixtures } from "../../store/fixtures-thunk";
import { getTimeToMatch } from "../../helpers/getTimeToMatch";
import { resetFixturesReqStatus } from "../../store/fixtures-slice";
import { FinishedMatchPreview } from "../FinishedMatchPreview/FinishedMatchPreview";
import classes from "./FinishedMatchesPreviewList.module.scss";

export const FinishedMatchesPreviewList = () => {
  const { currentLeagueId, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const { finishedMatches, nextLiveMatch } = useAppSelector(
    ({ fixtures }) => fixtures
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timerId: number | null = null;

    if (currentLeagueId && currentSeason) {
      dispatch(
        fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
      );

      if (nextLiveMatch) {
        const timeToMatch = getTimeToMatch(nextLiveMatch.fixture.date);
        if (timeToMatch) {
          timerId = window.setTimeout(() => {
            dispatch(resetFixturesReqStatus());
            dispatch(
              fetchFixtures({
                leagueId: currentLeagueId,
                season: currentSeason,
              })
            );
          }, timeToMatch);
        }
      }
    }

    return () => {
      if (timerId) window.clearTimeout(timerId);
    };
  }, [currentLeagueId, currentSeason, nextLiveMatch]);

  if (finishedMatches && finishedMatches.length) {
    const [latestMatchDay] = finishedMatches;
    const latestMatches = latestMatchDay.fixtures;
    const previewList = latestMatches.map((finishedMatchInfo) => (
      <div className={classes.previewCard} key={finishedMatchInfo.fixture.id}>
        <FinishedMatchPreview matchInfo={finishedMatchInfo} />
      </div>
    ));

    const isSingleMatch = previewList.length === 1;

    return (
      <section className={classes.preview}>
        <h2 className={classes.previewTitle}>Latest Matches</h2>
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
          <p className={classes.message}>Sorry, no matches were played...</p>
        )}
      </section>
    );
  }

  return <p className={classes.message}>Sorry, Matches Not Found...</p>;
};
