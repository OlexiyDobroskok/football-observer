import { FixtureTeam } from "api/types/fixtures-types";
import { ClubLogo } from "ui/ClubLogo/ClubLogo";
import { locationStatus, LocationStatus } from "api/helpers/consts";
import classes from "./ListTeamMark.module.scss";

export interface ListTeamMarkProps {
  team: FixtureTeam;
  teamStatus: LocationStatus;
}

export const ListTeamMark = ({
  team: { name, logo },
  teamStatus,
}: ListTeamMarkProps) => {
  const teamClassName = [
    classes.team,
    teamStatus === locationStatus.away && classes.awayTeam,
  ].join(" ");

  return (
    <div className={teamClassName}>
      <p className={classes.teamName}>{name}</p>
      <ClubLogo logo={logo} logoSize="MD" />
    </div>
  );
};
