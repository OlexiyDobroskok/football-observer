import { FixturePlayerEvents } from "../../types/types";
import { getEventTimeDescription } from "../../helpers/event-description";
import { LocationStatus, locationStatus } from "api/helpers/consts";
import classes from "./GoalAssist.module.scss";

export interface GoalAssistProps {
  eventPlayer: FixturePlayerEvents;
  teamLocationStatus: LocationStatus;
}

export const GoalAssist = ({
  eventPlayer: { player, events },
  teamLocationStatus,
}: GoalAssistProps) => {
  const assistTime = events
    .map(({ time }) => getEventTimeDescription(time))
    .join(", ");

  const assistDescription = `${
    player.name ? player.name : "Unknown"
  } ${assistTime}`;

  const descriptionClassName = [
    classes.goalAssistant,
    teamLocationStatus === locationStatus.home && classes.rightText,
  ].join(" ");

  return <p className={descriptionClassName}>{assistDescription}</p>;
};
