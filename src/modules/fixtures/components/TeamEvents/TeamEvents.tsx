import { useMemo } from "react";
import { TeamEventsDefinition } from "../../types/types";
import { GoalEvent } from "../../ui/GoalEvent/GoalEvent";
import { sortPlayerEventsByType } from "../../helpers/convertEvents";
import classes from "./TeamEvents.module.scss";

export interface TeamEventsProps {
  eventsDefinition: TeamEventsDefinition;
}

export const TeamEvents = ({
  eventsDefinition: { events, locationStatus },
}: TeamEventsProps) => {
  const sortedPlayersEvents = useMemo(
    () => sortPlayerEventsByType(events),
    [events]
  );

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
    <div className="events">
      <div className={classes.eventsList}>{goalsList}</div>
    </div>
  );
};
