import { TeamEventsDefinition } from "api/types/fixtures-types";
import { GoalEvent } from "../../ui/GoalEvent/GoalEvent";
import { usePlayersEvents } from "../../hooks/use-players-events";
import classes from "./TeamEvents.module.scss";

export interface TeamEventsProps {
  eventsDefinition: TeamEventsDefinition;
}

export const TeamEvents = ({
  eventsDefinition: { events, locationStatus },
}: TeamEventsProps) => {
  const sortedPlayersEvents = usePlayersEvents(events);

  const goalsList = sortedPlayersEvents.map(({ goals }) =>
    goals.length ? (
      <GoalEvent
        key={goals[0].id}
        events={goals}
        teamLocationStatus={locationStatus}
      />
    ) : (
      ""
    )
  );

  return (
    <div>
      <div className={classes.list}>{goalsList}</div>
    </div>
  );
};
