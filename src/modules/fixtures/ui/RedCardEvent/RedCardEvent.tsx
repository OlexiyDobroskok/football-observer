import { FixtureEventPlayer } from "../../types/types";
import { locationStatus, LocationStatus } from "api/helpers/consts";
import { getGoalDescription } from "../../helpers/event-description";
import classes from "./RedCardEvent.module.scss";

export interface RedCardEventProps {
  eventPlayer: FixtureEventPlayer;
  teamLocationStatus: LocationStatus;
}

export const RedCardEvent = ({
  eventPlayer: { player, events },
  teamLocationStatus,
}: RedCardEventProps) => {
  const [{ time, detail }] = events;
  const playerName = player.name ? player.name : "Unknown";

  const redCardDescription = getGoalDescription({ time, detail });

  const isAwayTeam = teamLocationStatus === locationStatus.away;

  const redCardEventClassName = [
    classes.redCardEvent,
    isAwayTeam && classes.awayTeamEvent,
  ].join(" ");

  const descriptionClassName = [
    classes.redCardDescription,
    isAwayTeam && classes.leftText,
  ].join(" ");

  const iconClassName = [
    classes.redCardIcon,
    isAwayTeam && classes.reverse,
  ].join(" ");

  return (
    <div className={redCardEventClassName}>
      <p
        className={descriptionClassName}
      >{`${playerName} ${redCardDescription}`}</p>
      <div className={iconClassName}></div>
    </div>
  );
};
