import { FixtureTeam } from "api/types/fixtures-types";
import { TeamLogo } from "components/TeamLogo/TeamLogo";
import classes from "./PreviewTeamMark.module.scss";

export interface PreviewTeamMarkProps {
  team: FixtureTeam;
}

export const PreviewTeamMark = ({
  team: { id, name, logo },
}: PreviewTeamMarkProps) => (
  <div className={classes.team}>
    <div className={classes.teamLogo}>
      <TeamLogo id={id} name={name} logo={logo} />
    </div>
    <p className={classes.teamName} id={name}>
      {name}
    </p>
  </div>
);
