import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchFixtures } from "../../store/fixtures-thunk";
import { getTimeToMatch } from "../../helpers/getTimeToMatch";
import { resetFixturesReqStatus } from "../../store/fixtures-slice";
import { ScheduledMatchPreview } from "../ScheduledMatchPreview/ScheduledMatchPreview";
import classes from "./ScheduleMatchesPreviewList.module.scss";

export const ScheduledMatchesPreviewList = () => {
  const { currentLeagueId, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const { scheduledMatches, nextLiveMatch } = useAppSelector(
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

  if (scheduledMatches && scheduledMatches.length) {
    const [upcomingMatchDay] = scheduledMatches;
    const upcomingMatches = upcomingMatchDay.fixtures;
    const previewList = upcomingMatches.map((upcomingMatchInfo) => (
      <div className={classes.previewCard} key={upcomingMatchInfo.fixture.id}>
        <ScheduledMatchPreview matchInfo={upcomingMatchInfo} />
      </div>
    ));

    const isSingleMatch = previewList.length === 1;

    return (
      <>
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
            Sorry, there are no scheduled matches...
          </p>
        )}
      </>
    );
  }

  return <p className={classes.message}>Sorry, Matches Not Found...</p>;
};
