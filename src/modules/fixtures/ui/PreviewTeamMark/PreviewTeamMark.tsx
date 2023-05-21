import { FixtureTeam } from "api/types/fixtures-types";
import classes from "./PreviewTeamMark.module.scss";
import { Link } from "react-router-dom";

export interface PreviewTeamMarkProps {
  team: FixtureTeam;
}

export const PreviewTeamMark = ({
  team: { id, name, logo },
}: PreviewTeamMarkProps) => (
  <div className={classes.team}>
    <img className={classes.teamLogo} src={logo} alt="" />
    <p className={classes.teamName} id={name}>
      {name}
    </p>
    <Link
      className={classes.teamLink}
      to={`/teams/${id}`}
      aria-labelledby={name}
    />
  </div>
);
