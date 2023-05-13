import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchFixtures } from "../../store/fixtures-thunk";
import { useInfinityPagination } from "hooks/use-infinity-pagination";
import { checkIsEven } from "helpers/check-is-even";
import { FixtureItem } from "../FixtureItem/FixtureItem";
import {
  getDateLongFormat,
  getValidDateTimeStrYMDFormat,
} from "../../helpers/date-format";
import { MatchesType } from "../../types/types";
import classes from "./FixturesList.module.scss";

export interface FixturesListProps {
  fixturesType: Exclude<MatchesType, "LIVE">;
}

export const FixturesList = ({ fixturesType }: FixturesListProps) => {
  const { currentLeagueId, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const { scheduledMatches, finishedMatches } = useAppSelector(
    ({ fixtures }) => fixtures
  );
  const dispatch = useAppDispatch();

  const fixturesList =
    !!scheduledMatches && fixturesType === "SCHEDULED"
      ? scheduledMatches
      : finishedMatches
      ? finishedMatches
      : [];

  const [containerRef, fixturesPage] = useInfinityPagination({
    dataList: fixturesList,
    elementsPerPage: 7,
    observerOptions: { threshold: 0 },
  });

  useEffect(() => {
    if (currentLeagueId && currentSeason)
      dispatch(
        fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
      );
  }, [currentLeagueId, currentSeason]);

  const matchesList = fixturesPage.map(({ date, fixtures }) => {
    const matchesDate = new Date(date);
    const formattedDate = getDateLongFormat(matchesDate);
    const dayMatchesList = fixtures.map(({ fixture, teams, goals }, index) => (
      <FixtureItem
        key={fixture.id}
        fixtureId={fixture.id}
        date={fixture.date}
        matchStatus={fixture.status.short}
        teamsOfMatch={teams}
        matchScore={goals}
        isEven={checkIsEven(index)}
      />
    ));

    return (
      <Fragment key={date}>
        <p className={classes.date}>
          <time dateTime={getValidDateTimeStrYMDFormat(matchesDate)}>
            {formattedDate}
          </time>
        </p>
        <div ref={containerRef}>{dayMatchesList}</div>
      </Fragment>
    );
  });

  const emptyMessage =
    fixturesType === "FINISHED"
      ? "Sorry, no matches were played..."
      : "Sorry, there are no scheduled matches...";

  const isMatchesData = !!finishedMatches && !!scheduledMatches;

  return (
    <>
      {!!matchesList.length && (
        <div className={classes["fixtures-list"]}>{matchesList}</div>
      )}
      {!matchesList.length && isMatchesData && (
        <p className={classes.message}>{emptyMessage}</p>
      )}
      {!isMatchesData && (
        <p className={classes.message}>Sorry, Matches Not Found...</p>
      )}
    </>
  );
};
