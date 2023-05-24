import {
  FixtureEventApp,
  FixtureEventAppAlt,
  FixtureEventPlayer,
  FixtureEventPlayers,
} from "../types/types";
import {
  checkIsGoalEvent,
  checkIsRedCardEvent,
  checkIsSubstitutionEvent,
  checkIsYellowCardEvent,
} from "./check-is-match-event";

const getPlayersEvents = ({
  playerIds,
  events,
  assistEvent = false,
}: {
  playerIds: number[];
  events: FixtureEventApp[];
  assistEvent?: boolean;
}) => {
  return playerIds
    .map((playerId): FixtureEventPlayer | null => {
      const playerEvents = events.filter(
        assistEvent
          ? ({ assist }) => assist.id === playerId
          : ({ player }) => player.id === playerId
      );

      if (playerEvents.length) {
        const [{ player, assist }] = playerEvents;
        const playerGoalEventsConverted: FixtureEventAppAlt[] =
          playerEvents.map(({ id, type, detail, time }) => ({
            id,
            time,
            type,
            detail,
          }));
        return {
          player: assistEvent ? assist : player,
          events: playerGoalEventsConverted,
        };
      }
      return null;
    })
    .filter(Boolean) as FixtureEventPlayer[];
};

interface AvailableEvents {
  goalEvents: FixtureEventApp[];
  redCardEvents: FixtureEventApp[];
  yellowCardEvents: FixtureEventApp[];
  substitutionEvents: FixtureEventApp[];
}

export const sortEventPlayers = (
  teamEvents: FixtureEventApp[]
): FixtureEventPlayers => {
  const eventPlayers: FixtureEventPlayers = {
    goals: [],
    assists: [],
    redCards: [],
    yellowCards: [],
    substitutionIn: [],
    substitutionOut: [],
  };

  if (!teamEvents.length) {
    return eventPlayers;
  }

  const playersHasGoalEvent = new Set<number>();
  const playersHasGoalAssist = new Set<number>();
  const playersHasRedCard = new Set<number>();
  const playersHasYellowCard = new Set<number>();
  const playersHasSubstitutionInEvent = new Set<number>();
  const playersHasSubstitutionOutEvent = new Set<number>();

  const events: AvailableEvents = {
    goalEvents: [],
    redCardEvents: [],
    yellowCardEvents: [],
    substitutionEvents: [],
  };

  teamEvents.forEach((event) => {
    const { player, assist, type, detail } = event;
    if (checkIsGoalEvent({ type, detail })) {
      if (player.id) playersHasGoalEvent.add(player.id);
      if (assist.id) playersHasGoalAssist.add(assist.id);
      events.goalEvents = [...events.goalEvents, event];
    }
    if (checkIsRedCardEvent({ type, detail })) {
      if (player.id) playersHasRedCard.add(player.id);
      events.redCardEvents = [...events.redCardEvents, event];
    }
    if (checkIsYellowCardEvent({ type, detail })) {
      if (player.id) playersHasYellowCard.add(player.id);
      events.yellowCardEvents = [...events.yellowCardEvents, event];
    }
    if (checkIsSubstitutionEvent({ type, detail })) {
      if (player.id) playersHasSubstitutionOutEvent.add(player.id);
      if (assist.id) playersHasSubstitutionInEvent.add(assist.id);
      events.substitutionEvents = [...events.substitutionEvents, event];
    }
  });

  const { goalEvents, redCardEvents, yellowCardEvents, substitutionEvents } =
    events;

  eventPlayers.goals = getPlayersEvents({
    playerIds: [...playersHasGoalEvent],
    events: goalEvents,
  });
  eventPlayers.assists = getPlayersEvents({
    playerIds: [...playersHasGoalAssist],
    events: goalEvents,
    assistEvent: true,
  });
  eventPlayers.redCards = getPlayersEvents({
    playerIds: [...playersHasRedCard],
    events: redCardEvents,
  });
  eventPlayers.yellowCards = getPlayersEvents({
    playerIds: [...playersHasYellowCard],
    events: yellowCardEvents,
  });
  eventPlayers.substitutionOut = getPlayersEvents({
    playerIds: [...playersHasSubstitutionOutEvent],
    events: substitutionEvents,
  });
  eventPlayers.substitutionIn = getPlayersEvents({
    playerIds: [...playersHasSubstitutionInEvent],
    events: substitutionEvents,
    assistEvent: true,
  });

  return eventPlayers;
};
