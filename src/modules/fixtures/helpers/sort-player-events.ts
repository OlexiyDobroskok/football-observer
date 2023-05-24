import { LineupPlayerDefinition } from "api/types/fixtures-types";
import { FixtureEventApp, SortedPlayerEvents } from "../types/types";
import {
  checkIsGoalEvent,
  checkIsRedCardEvent,
  checkIsSubstitutionEvent,
  checkIsYellowCardEvent,
} from "./check-is-match-event";

export const sortPlayerEvents = ({
  player,
  events,
}: {
  player: LineupPlayerDefinition;
  events: FixtureEventApp[];
}) => {
  if (!events.length) return null;

  const allPlayerEvents = events.filter(
    (event) => event.player.id === player.id || event.assist.id === player.id
  );

  if (!allPlayerEvents.length) return null;

  const playerEvents: SortedPlayerEvents = {
    goals: [],
    assists: [],
    redCards: [],
    yellowCards: [],
    substitutionOut: [],
    substitutionIn: [],
  };

  allPlayerEvents.forEach((event) => {
    const { player: eventPlayer, assist: eventAssistant, type, detail } = event;
    if (checkIsGoalEvent({ type, detail })) {
      if (eventPlayer.id && eventPlayer.id === player.id) {
        playerEvents.goals = [...playerEvents.goals, event];
      }
      if (eventAssistant.id && eventAssistant.id === player.id) {
        playerEvents.assists = [...playerEvents.assists, event];
      }
    }
    if (checkIsRedCardEvent({ type, detail })) {
      if (eventPlayer.id && eventPlayer.id === player.id) {
        playerEvents.redCards = [...playerEvents.redCards, event];
      }
    }
    if (checkIsYellowCardEvent({ type, detail })) {
      if (eventPlayer.id && eventPlayer.id === player.id) {
        playerEvents.yellowCards = [...playerEvents.yellowCards, event];
      }
    }
    if (checkIsSubstitutionEvent({ type, detail })) {
      if (eventPlayer.id && eventPlayer.id === player.id) {
        playerEvents.substitutionOut = [...playerEvents.substitutionOut, event];
      }
      if (eventAssistant.id && eventAssistant.id === player.id) {
        playerEvents.substitutionIn = [...playerEvents.substitutionIn, event];
      }
    }
  });

  return playerEvents;
};
