import { FixtureTeam } from "api/types/fixtures-types";
import { ClubLogo } from "ui/ClubLogo/ClubLogo";
import classes from "./ListTeamCard.module.scss";

export interface ListTeamCardProps {
  team: FixtureTeam;
  teamStatus: "HOME" | "AWAY";
}

export const ListTeamCard = ({
  team: { name, logo },
  teamStatus,
}: ListTeamCardProps) => (
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
