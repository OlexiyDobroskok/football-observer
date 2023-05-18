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
  <div
    className={[classes.team, teamStatus === "AWAY" && classes.awayTeam].join(
      " "
    )}
  >
    <p
      className={[
        classes.teamName,
        teamStatus === "AWAY" && classes.reverse,
      ].join(" ")}
    >
      {name}
    </p>
    <ClubLogo logo={logo} logoSize="MD" />
  </div>
);
