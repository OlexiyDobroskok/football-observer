import { Fragment } from "react";
import { DayFixtures } from "api/types/fixtures-types";
import { getDateLongFormat } from "modules/fixtures/helpers/date-format";
import { FixtureItem } from "modules/fixtures/components/FixtureItem/FixtureItem";
import { checkIsEven } from "helpers/check-is-even";
import classes from "./FixturesList.module.scss";

export interface FixturesListProps {
  fixtures: DayFixtures[];
}

export const FixturesList = ({ fixtures }: FixturesListProps) => {
  const allMatchesList = fixtures.map(({ date, fixtures }) => {
    const matchesDate = new Date(date);
    const formattedDate = getDateLongFormat(matchesDate);
    const dayMatchesList = fixtures.map(({ fixture, teams, goals }, index) => (
      <FixtureItem
        key={fixture.id}
        date={fixture.date}
        teamsOfMatch={teams}
        matchScore={goals}
        isEven={checkIsEven(index)}
      />
    ));

    return (
      <Fragment key={date}>
        <p className={classes.date}>{formattedDate}</p>
        <div>{dayMatchesList}</div>
      </Fragment>
    );
  });

  return <div className={classes["fixtures-list"]}>{allMatchesList}</div>;
};
