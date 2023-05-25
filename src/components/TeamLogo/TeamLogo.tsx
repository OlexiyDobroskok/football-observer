import { Link } from "react-router-dom";
import classes from "./TeamLogo.module.scss";

export interface TeamLogoProps {
  id: number | string;
  name: string;
  logo: string;
}

export const TeamLogo = ({ id, name, logo }: TeamLogoProps) => (
  <Link to={`/teams/${id}`} aria-label={`Move to ${name} team information`}>
    <div className={classes.teamLogo}>
      <img className={classes.teamLogoImg} src={logo} alt="" />
    </div>
  </Link>
);
