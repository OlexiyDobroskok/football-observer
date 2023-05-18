import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useInfinityPagination } from "hooks/use-infinity-pagination";
import { resetFixturesReqStatus } from "../../store/fixtures-slice";
import { fetchFixtures } from "../../store/fixtures-thunk";
import { ScheduledMatchItem } from "../ScheduledMatchItem/ScheduledMatchItem";
import { getTimeToMatch } from "../../helpers/getTimeToMatch";
import {
  getDateLongFormat,
  getValidDateTimeStrYMDFormat,
} from "../../helpers/date-format";
import { checkIsEven } from "helpers/check-is-even";
import classes from "./ScheduledMatchesList.module.scss";

export const ScheduledMatchesList = () => {
  const { currentLeagueId, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const { scheduledMatches, nextLiveMatch } = useAppSelector(
    ({ fixtures }) => fixtures
  );
  const dispatch = useAppDispatch();
  const [containerRef, fixturesPage] = useInfinityPagination({
    dataList: scheduledMatches ? scheduledMatches : [],
    elementsPerPage: 7,
    observerOptions: { threshold: 0 },
  });

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

  const matchesList = fixturesPage.map(({ date, fixtures }) => {
    const matchesDate = new Date(date);
    const formattedDate = getDateLongFormat(matchesDate);
    const dayMatchesList = fixtures.map(({ fixture, teams, goals }, index) => (
      <ScheduledMatchItem
        key={fixture.id}
        fixtureId={fixture.id}
        fixtureDate={fixture.date}
        matchStatus={fixture.status.short}
        teamsOfMatch={teams}
        isEven={checkIsEven(index)}
      />
    ));

    return (
      <Fragment key={date}>
        <div className={classes.date}>
          <time dateTime={getValidDateTimeStrYMDFormat(matchesDate)}>
            {formattedDate}
          </time>
        </div>
        <div ref={containerRef}>{dayMatchesList}</div>
      </Fragment>
    );
  });

  return (
    <>
      {!!matchesList.length && (
        <div className={classes.fixturesList}>{matchesList}</div>
      )}
      {scheduledMatches && !matchesList.length && (
        <p className={classes.message}>
          Sorry, there are no scheduled matches...
        </p>
      )}
      {!scheduledMatches && (
        <p className={classes.message}>Sorry, Matches Not Found...</p>
      )}
    </>
  );
};
