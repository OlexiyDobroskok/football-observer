import { getGoalDescription } from "../../helpers/get-goal-description";
import { FixtureEventApp } from "../../types/types";
import ballIcon from "./ball.svg";
import classes from "./GoalEvent.module.scss";

export interface GoalEventProps {
  events: FixtureEventApp[];
  teamLocationStatus: "HOME" | "AWAY";
}

export const GoalEvent = ({ events, teamLocationStatus }: GoalEventProps) => {
  const [goalEvent] = events;
  const playerName = goalEvent.player.name;

  let goalDescription = "";
  if (events.length > 1) {
    goalDescription = events
      .map((event) => getGoalDescription(event))
      .join(", ");
  }

  if (events.length === 1) {
    goalDescription = getGoalDescription(goalEvent);
  }

  return (
    <div className={classes.event}>
      <p
        className={classes.description}
      >{`${playerName} ${goalDescription}`}</p>
      <img
        className={[
          classes.icon,
          teamLocationStatus === "AWAY" && classes.away,
        ].join(" ")}
        src={ballIcon}
        alt=""
      />
    </div>
  );
};
