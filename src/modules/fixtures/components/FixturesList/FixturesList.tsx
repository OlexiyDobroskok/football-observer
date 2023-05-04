import { Fragment } from "react";
import { useInfinityPagination } from "hooks/use-infinity-pagination";
import { checkIsEven } from "helpers/check-is-even";
import { FixtureItem } from "../FixtureItem/FixtureItem";
import {
  getDateLongFormat,
  getValidDateTimeStrYMDFormat,
} from "../../helpers/date-format";
import { DayFixtures } from "../../helpers/day-fixtures-converter";
import classes from "./FixturesList.module.scss";

export interface FixturesListProps {
  fixtures: DayFixtures[];
}

export const FixturesList = ({ fixtures }: FixturesListProps) => {
  const [containerRef, fixturesPage] = useInfinityPagination({
    dataList: fixtures,
    elementsPerPage: 7,
    observerOptions: { threshold: 0 },
  });

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

  return <div className={classes["fixtures-list"]}>{matchesList}</div>;
};
