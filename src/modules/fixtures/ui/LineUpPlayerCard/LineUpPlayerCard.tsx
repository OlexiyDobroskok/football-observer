import { Link } from "react-router-dom";
import { LineUpPlayerCombined } from "../../types/types";
import { PlayerEventList } from "../PlayerEventList/PlayerEventList";
import classes from "./LineUpPlayerCard.module.scss";

export interface LineUpPlayerCardProps {
  player: LineUpPlayerCombined;
}

export const LineUpPlayerCard = ({
  player: { id, name, photo, number, events },
}: LineUpPlayerCardProps) => {
  return (
    <li className={classes.player}>
      <div className={classes.playerNumber}>{number ? number : "-"}</div>
      <img
        className={classes.playerPhoto}
        src={photo ? photo : ""}
        alt={`Photo for ${name}`}
      />

      <Link className={classes.playerLink} to={`/players/${id}`}>
        <span className={classes.playerName}>{name}</span>
      </Link>
      {events && (
        <div className="playerEvents">
          <PlayerEventList events={events} />
        </div>
      )}
    </li>
  );
};
