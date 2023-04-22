import { FixtureTeam } from "api/types/fixtures-types";
import { ClubLogo } from "ui/ClubLogo/ClubLogo";
import classes from "./TeamCard.module.scss";

export interface TeamCardProps {
  team: FixtureTeam;
  teamStatus: "HOME" | "AWAY";
}

export const TeamCard = ({
  team: { name, logo },
  teamStatus,
}: TeamCardProps) => (
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
