import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchFixtures } from "../store/fixtures-thunk";
import { getTimeToMatch } from "../helpers/get-time-to-match";
import { resetFixturesReqStatus } from "../store/fixtures-slice";

export const useFixtures = () => {
  const { currentLeagueId, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const fixturesState = useAppSelector(({ fixtures }) => fixtures);
  const { isLiveMatches, nextLiveMatch } = fixturesState;
  const dispatch = useAppDispatch();
  const timerIdRef = useRef<number | null>(null);
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (currentLeagueId && currentSeason) {
      dispatch(
        fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
      );

      if (isLiveMatches) {
        intervalIdRef.current = window.setInterval(() => {
          dispatch(resetFixturesReqStatus());
          dispatch(
            fetchFixtures({
              leagueId: currentLeagueId,
              season: currentSeason,
            })
          );
        }, 30000);
      }

      if (!isLiveMatches && nextLiveMatch) {
        const timeToMatch = getTimeToMatch(nextLiveMatch.fixture.date);
        if (timeToMatch) {
          timerIdRef.current = window.setTimeout(() => {
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
      if (isLiveMatches) dispatch(resetFixturesReqStatus());
      if (timerIdRef.current) window.clearTimeout(timerIdRef.current);
      if (intervalIdRef.current) window.clearInterval(intervalIdRef.current);
    };
  }, [currentLeagueId, currentSeason, nextLiveMatch, isLiveMatches]);

  return fixturesState;
};
