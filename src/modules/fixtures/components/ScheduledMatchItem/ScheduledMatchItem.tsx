import { Link } from "react-router-dom";
import { FixtureTeamsLocationStatus } from "api/types/fixtures-types";
import { ListTeamMark } from "../../ui/ListTeamMark/ListTeamMark";
import {
  FixtureShortStatus,
  fixtureStatus,
  locationStatus,
} from "api/helpers/consts";
import {
  getTimeShortFormat,
  getValidDateTimeStrYMDFormat,
} from "../../helpers/date-format";
import classes from "./ScheduledMatchItem.module.scss";

export interface ScheduledMatchItemProps {
  fixtureId: number;
  fixtureDate: string;
  matchStatus: FixtureShortStatus;
  teamsOfMatch: FixtureTeamsLocationStatus;
  isEven?: boolean;
}

export const ScheduledMatchItem = ({
  fixtureId,
  fixtureDate,
  matchStatus,
  teamsOfMatch,
  isEven,
}: ScheduledMatchItemProps) => {
  const { home: homeTeam, away: awayTeam } = teamsOfMatch;
  const matchDate = new Date(fixtureDate);
  const matchTime =
    matchStatus === fixtureStatus.TBD ? `- : -` : getTimeShortFormat(matchDate);
  const fixtureClassName = [classes.fixture, isEven && classes.altBg].join(" ");

  return (
    <div className={fixtureClassName}>
      <ListTeamMark team={homeTeam} teamStatus={locationStatus.home} />
      <div className={classes.fixtureTime}>
        <time dateTime={getValidDateTimeStrYMDFormat(matchDate)}>
          {matchTime}
        </time>
      </div>
      <ListTeamMark team={awayTeam} teamStatus={locationStatus.away} />
      <Link className={classes.fixtureLink} to={`/fixtures/${fixtureId}`} />
    </div>
  );
};
