import { FixtureTeam } from "api/types/fixtures-types";
import classes from "./PreviewTeamMark.module.scss";

export interface PreviewTeamMarkProps {
  team: FixtureTeam;
}

export const PreviewTeamMark = ({
  team: { name, logo },
}: PreviewTeamMarkProps) => (
  <div className={classes.card}>
    <img className={classes.logo} src={logo} alt="" />
    <p className={classes.name}>{name}</p>
  </div>
);
