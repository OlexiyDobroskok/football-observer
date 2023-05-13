import { FixtureTeam } from "api/types/fixtures-types";
import { ClubLogo } from "ui/ClubLogo/ClubLogo";
import { TeamLocationStatus } from "api/types/global";
import classes from "./ListTeamMark.module.scss";

export interface ListTeamMarkProps {
  team: FixtureTeam;
  teamStatus: TeamLocationStatus;
}

export const ListTeamMark = ({
  team: { name, logo },
  teamStatus,
}: ListTeamMarkProps) => (
  <div className={classes.card}>
    <p
      className={[classes.name, teamStatus === "AWAY" && classes.away].join(
        " "
      )}
    >
      {name}
    </p>
    <ClubLogo logo={logo} logoSize="MD" />
  </div>
);
