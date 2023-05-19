import { getGoalDescription } from "../../helpers/get-goal-description";
import { FixtureEventApp } from "../../types/types";
import ballIcon from "./ball.svg";
import { TeamLocationStatus } from "api/types/global";
import classes from "./GoalEvent.module.scss";

export interface GoalEventProps {
  events: FixtureEventApp[];
  teamLocationStatus: TeamLocationStatus;
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

  const isAwayTeam = teamLocationStatus === "AWAY";

  return (
    <div
      className={[classes.goalEvent, isAwayTeam && classes.awayTeamEvent].join(
        " "
      )}
    >
      <p
        className={classes.goalDescription}
      >{`${playerName} ${goalDescription}`}</p>
      <img
        className={[classes.goalIcon, isAwayTeam && classes.reverse].join(" ")}
        src={ballIcon}
        alt=""
      />
    </div>
  );
};
