import { getGoalDescription } from "../../helpers/event-description";
import { FixtureEventPlayer } from "../../types/types";
import {
  fixtureEventType,
  fixtureGoalType,
  LocationStatus,
  locationStatus,
} from "api/helpers/consts";
import { SvgIcon } from "ui/SvgIcon/SvgIcon";
import ballIcon from "./ball.svg";
import classes from "./GoalEvent.module.scss";

export interface GoalEventProps {
  eventPlayer: FixtureEventPlayer;
  teamLocationStatus: LocationStatus;
}

export const GoalEvent = ({
  eventPlayer: { player, events },
  teamLocationStatus,
}: GoalEventProps) => {
  const [{ type, detail }] = events;
  const playerName = player.name ? player.name : "Unknown";
  const isOwnGoal =
    type.toLowerCase() === fixtureEventType.GOAL.toLowerCase() &&
    detail.toLowerCase() === fixtureGoalType.OWN.toLowerCase();

  const goalDescription = events
    .map(({ time, detail }) => getGoalDescription({ time, detail }))
    .join(", ");

  const isAwayTeam = teamLocationStatus === locationStatus.away;

  const goalEventClassName = [
    classes.goalEvent,
    isAwayTeam && classes.awayTeamEvent,
  ].join(" ");

  const descriptionClassName = [
    classes.goalDescription,
    isAwayTeam && classes.leftText,
    isOwnGoal && classes.altTextColor,
  ].join(" ");

  const classNameIcon = [classes.goalIcon, isAwayTeam && classes.reverse].join(
    " "
  );

  return (
    <div className={goalEventClassName}>
      <p
        className={descriptionClassName}
      >{`${playerName} ${goalDescription}`}</p>
      <div className={classNameIcon}>
        {isOwnGoal ? (
          <SvgIcon className={classes.icon} href={`${ballIcon}#ballRed`} />
        ) : (
          <SvgIcon className={classes.icon} href={`${ballIcon}#ball`} />
        )}
      </div>
    </div>
  );
};
