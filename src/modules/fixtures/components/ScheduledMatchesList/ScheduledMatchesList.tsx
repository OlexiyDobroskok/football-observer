import { Fragment } from "react";
import { useFixtures } from "../../hooks/use-fixtures";
import { useInfinityPagination } from "hooks/use-infinity-pagination";
import { ScheduledMatchItem } from "../ScheduledMatchItem/ScheduledMatchItem";
import {
  getDateLongFormat,
  getValidDateTimeStrYMDFormat,
} from "../../helpers/date-format";
import { checkIsEven } from "helpers/check-is-even";
import classes from "./ScheduledMatchesList.module.scss";

export const ScheduledMatchesList = () => {
  const { scheduledMatches } = useFixtures();

  const [containerRef, fixturesPage] = useInfinityPagination({
    dataList: scheduledMatches ? scheduledMatches : [],
    elementsPerPage: 7,
    observerOptions: { threshold: 0 },
  });

  const matchesList = fixturesPage.map(({ date, fixtures }) => {
    const matchesDate = new Date(date);
    const formattedDate = getDateLongFormat(matchesDate);
    const dayMatchesList = fixtures.map(({ fixture, teams }, index) => (
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
