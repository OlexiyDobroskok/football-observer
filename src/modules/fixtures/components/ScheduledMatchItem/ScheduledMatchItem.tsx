import { Link } from "react-router-dom";
import { FixtureTeamsLocationStatus } from "api/types/fixtures-types";
import { ListTeamMark } from "../../ui/ListTeamMark/ListTeamMark";
import { FixtureShortStatus, fixtureStatus } from "api/helpers/consts";
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

  return (
    <div className={[classes.fixture, isEven && classes.lightBg].join(" ")}>
      <ListTeamMark team={homeTeam} teamStatus={"HOME"} />
      <div className={classes.fixtureTime}>
        <time dateTime={getValidDateTimeStrYMDFormat(matchDate)}>
          {matchTime}
        </time>
      </div>
      <ListTeamMark team={awayTeam} teamStatus={"AWAY"} />
      <Link className={classes.fixtureLink} to={`/fixtures/${fixtureId}`} />
    </div>
  );
};
