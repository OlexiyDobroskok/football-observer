import { FixtureEvent } from "api/types/fixtures-types";
import {
  FixtureEventApp,
  SortedEventsByTeamsLocationStatus,
  SortedEventsByTypes,
} from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { fixtureEventType, fixtureGoalType } from "api/helpers/consts";

export const sortEventsByTeamsLocationStatus = ({
  homeTeamId,
  awayTeamId,
  events,
}: {
  homeTeamId: number;
  awayTeamId: number;
  events: FixtureEvent[];
}): SortedEventsByTeamsLocationStatus => {
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

export const sortPlayerEventsByType = (events: FixtureEventApp[]) => {
  const players = new Set<number>();
  events.forEach(({ player }) => players.add(player.id));

  return [...players].map((playerId): SortedEventsByTypes => {
    const allEvents = events.filter(({ player }) => player.id === playerId);

    return {
      goals: allEvents.filter(
        ({ type, detail }) =>
          type.toLowerCase() === fixtureEventType.GOAL.toLowerCase() &&
          (detail.toLowerCase() === fixtureGoalType.NORMAL.toLowerCase() ||
            detail.toLowerCase() === fixtureGoalType.PEN.toLowerCase() ||
            detail.toLowerCase() === fixtureGoalType.OWN.toLowerCase())
      ),
      cards: allEvents.filter(
        ({ type }) => type.toLowerCase() === fixtureEventType.CARD.toLowerCase()
      ),
      subst: allEvents.filter(
        ({ type }) =>
          type.toLowerCase() === fixtureEventType.SUBST.toLowerCase()
      ),
      var: allEvents.filter(
        ({ type }) => type.toLowerCase() === fixtureEventType.VAR.toLowerCase()
      ),
    };
  });
};
