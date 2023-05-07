import { useMemo } from "react";
import { fixtureEventType, fixtureGoalType } from "api/helpers/consts";
import { FixtureEventApp } from "api/types/fixtures-types";

export interface SortedPlayerEvents {
  goals: FixtureEventApp[];
  cards: FixtureEventApp[];
  subst: FixtureEventApp[];
  var: FixtureEventApp[];
}

export const usePlayersEvents = (events: FixtureEventApp[]) => {
  const players = new Set<number>();
  events.forEach(({ player }) => players.add(player.id));

  return useMemo(
    () =>
      [...players].map((playerId): SortedPlayerEvents => {
        const allEvents = events.filter(({ player }) => player.id === playerId);
        return {
          goals: allEvents.filter(
            ({ type, detail }) =>
              type.toLowerCase() === fixtureEventType.GOAL.toLowerCase() &&
              (detail.toLowerCase() === fixtureGoalType.NORMAL.toLowerCase() ||
                detail.toLowerCase() === fixtureGoalType.PEN.toLowerCase() ||
                detail.toLowerCase() === fixtureGoalType.OWN)
          ),
          cards: allEvents.filter(
            ({ type }) =>
              type.toLowerCase() === fixtureEventType.CARD.toLowerCase()
          ),
          subst: allEvents.filter(
            ({ type }) =>
              type.toLowerCase() === fixtureEventType.SUBST.toLowerCase()
          ),
          var: allEvents.filter(
            ({ type }) =>
              type.toLowerCase() === fixtureEventType.VAR.toLowerCase()
          ),
        };
      }),

    [events]
  );
};
