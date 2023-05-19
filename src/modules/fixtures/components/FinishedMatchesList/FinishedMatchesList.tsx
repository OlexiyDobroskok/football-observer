import { Fragment } from "react";
import { useFixtures } from "../../hooks/use-fixtures";
import { useInfinityPagination } from "hooks/use-infinity-pagination";
import { FinishedMatchItem } from "../FinishedMatchItem/FinishedMatchItem";
import {
  getDateLongFormat,
  getValidDateTimeStrYMDFormat,
} from "../../helpers/date-format";
import { checkIsEven } from "helpers/check-is-even";
import classes from "./FinishedMatchesList.module.scss";

export const FinishedMatchesList = () => {
  const { finishedMatches } = useFixtures();
  const [containerRef, fixturesPage] = useInfinityPagination({
    dataList: finishedMatches ? finishedMatches : [],
    elementsPerPage: 7,
    observerOptions: { threshold: 0 },
  });

  const matchesList = fixturesPage.map(({ date, fixtures }) => {
    const matchesDate = new Date(date);
    const formattedDate = getDateLongFormat(matchesDate);
    const dayMatchesList = fixtures.map(({ fixture, teams, goals }, index) => (
      <FinishedMatchItem
        key={fixture.id}
        fixtureId={fixture.id}
        teamsOfMatch={teams}
        matchScore={goals}
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
      {finishedMatches && !matchesList.length && (
        <p className={classes.message}>Sorry, no matches were played...</p>
      )}
      {!finishedMatches && (
        <p className={classes.message}>Sorry, Matches Not Found...</p>
      )}
    </>
  );
};
