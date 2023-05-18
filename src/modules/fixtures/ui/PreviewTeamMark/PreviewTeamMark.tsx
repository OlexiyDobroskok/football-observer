import { FixtureTeam } from "api/types/fixtures-types";
import classes from "./PreviewTeamMark.module.scss";

export interface PreviewTeamMarkProps {
  team: FixtureTeam;
}

export const PreviewTeamMark = ({
  team: { name, logo },
}: PreviewTeamMarkProps) => (
  <div className={classes.team}>
    <img className={classes.teamLogo} src={logo} alt="" />
    <p className={classes.teamName}>{name}</p>
  </div>
);
