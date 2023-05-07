import {
  SortedEvents,
  FixtureEvent,
  FixtureEventApp,
} from "api/types/fixtures-types";
import { v4 as uuidv4 } from "uuid";

interface ConvertEventsArgs {
  homeTeamId: number;
  awayTeamId: number;
  events: FixtureEvent[];
}

export const convertEvents = ({
  homeTeamId,
  awayTeamId,
  events,
}: ConvertEventsArgs): SortedEvents => {
  const homeTeamEvents = events
    .filter(({ team }) => team.id === homeTeamId)
    .map((event): FixtureEventApp => ({ ...event, id: uuidv4() }));
  const awayTeamEvents = events
    .filter(({ team }) => team.id === awayTeamId)
    .map((event): FixtureEventApp => ({ ...event, id: uuidv4() }));

  return {
    homeTeam: { locationStatus: "HOME", events: homeTeamEvents },
    awayTeam: { locationStatus: "AWAY", events: awayTeamEvents },
  };
};
