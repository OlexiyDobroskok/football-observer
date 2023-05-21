import { FixtureEvent } from "api/types/fixtures-types";
import { FixtureEventApp, FixtureTeamsEvents } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const sortEventsByTeam = ({
  homeTeamId,
  awayTeamId,
  events,
}: {
  homeTeamId: number;
  awayTeamId: number;
  events: FixtureEvent[];
}): FixtureTeamsEvents => {
  const homeTeamEvents = events
    .filter(({ team }) => team.id === homeTeamId)
    .map((event): FixtureEventApp => ({ ...event, id: uuidv4() }));
  const awayTeamEvents = events
    .filter(({ team }) => team.id === awayTeamId)
    .map((event): FixtureEventApp => ({ ...event, id: uuidv4() }));

  return {
    homeTeam: homeTeamEvents,
    awayTeam: awayTeamEvents,
  };
};
