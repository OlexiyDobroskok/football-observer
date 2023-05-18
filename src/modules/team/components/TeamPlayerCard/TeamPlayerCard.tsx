import { Link } from "react-router-dom";
import { TeamPlayerDefinition } from "api/types/team-types";
import classes from "./TeamPlayerCard.module.scss";

export interface TeamPlayerCardProps {
  player: TeamPlayerDefinition;
  isEven?: boolean;
}

export const TeamPlayerCard = ({
  player: { id, name, number, photo },
  isEven,
}: TeamPlayerCardProps) => (
  <li className={[classes.player, isEven && classes.altBg].join(" ")}>
    <div className={classes.playerNumber}>{number ? number : "-"}</div>
    <img
      className={classes.playerPhoto}
      src={photo}
      alt={`Photo for ${name}`}
    />

    <Link className={classes.playerLink} to={`/players/${id}`}>
      <span className={classes.playerName}>{name}</span>
    </Link>
  </li>
);
