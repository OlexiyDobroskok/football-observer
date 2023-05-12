import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchHeadToHeadFixtureInfo } from "../../store/head-to-head-thunk";
import { FixtureItem } from "../FixtureItem/FixtureItem";
import {
  getDateLongFormat,
  getValidDateTimeStrYMDFormat,
} from "../../helpers/date-format";
import { checkIsEven } from "helpers/check-is-even";
import classes from "./HeadToHeadMatchesList.module.scss";

export interface HeadToHeadMatchesListProps {
  numberRecentMatches?: number;
}

export const HeadToHeadMatchesList = ({
  numberRecentMatches,
}: HeadToHeadMatchesListProps) => {
  const { headToHeadFixtures } = useAppSelector(({ headToHead }) => headToHead);
  const { homeTeamId, awayTeamId } = useAppSelector(
    ({ fixtureDetail }) => fixtureDetail
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (homeTeamId && awayTeamId)
      dispatch(fetchHeadToHeadFixtureInfo({ homeTeamId, awayTeamId }));
  }, [homeTeamId, awayTeamId]);

  if (headToHeadFixtures) {
    const fixturesList = headToHeadFixtures
      .slice(0, numberRecentMatches)
      .map(({ fixture, teams, goals }, index) => {
        const { id, date, status, venue } = fixture;
        const matchDate = new Date(date);
        const formattedDate = getDateLongFormat(matchDate);
        const stadium = `${venue.name}, ${venue.city}`;
        return (
          <li
            className={[classes.item, checkIsEven(index) && classes.dark].join(
              " "
            )}
            key={id}
          >
            <p className={classes.description}>
              <time dateTime={getValidDateTimeStrYMDFormat(matchDate)}>
                {formattedDate}
              </time>
            </p>
            <p className={classes.description}>{stadium}</p>
            <FixtureItem
              fixtureId={id}
              date={date}
              matchStatus={status.short}
              teamsOfMatch={teams}
              matchScore={goals}
            />
          </li>
        );
      });

    return (
      <section className={classes["recent-meetings"]}>
        <h3 className={classes.title}>Recent Meetings</h3>
        <ul className={classes.list}>{fixturesList}</ul>
      </section>
    );
  }

  return (
    <section>
      <h3 className={classes.title}>Recent Meetings</h3>
      <p className={classes.message}>Not Found!</p>
    </section>
  );
};
