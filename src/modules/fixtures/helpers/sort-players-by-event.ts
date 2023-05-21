import {
  FixtureEventApp,
  FixtureEventAppAlt,
  FixturePlayerEvents,
  FixtureTeamEvents,
} from "../types/types";
import {
  fixtureCardType,
  FixtureEventType,
  fixtureEventType,
  fixtureGoalType,
} from "api/helpers/consts";
import { FixtureEventDetail } from "api/types/fixtures-types";

const checkIsGoalEvent = ({
  type,
  detail,
}: {
  type: FixtureEventType;
  detail: FixtureEventDetail;
}) =>
  type.toLowerCase() === fixtureEventType.GOAL.toLowerCase() &&
  (detail.toLowerCase() === fixtureGoalType.NORMAL.toLowerCase() ||
    detail.toLowerCase() === fixtureGoalType.PEN.toLowerCase() ||
    detail.toLowerCase() === fixtureGoalType.OWN.toLowerCase());

const checkIsRedCardEvent = ({
  type,
  detail,
}: {
  type: FixtureEventType;
  detail: FixtureEventDetail;
}) =>
  type.toLowerCase() === fixtureEventType.CARD.toLowerCase() &&
  detail.toLowerCase() === fixtureCardType.RED.toLowerCase();

export const sortPlayersByEvent = (
  teamEvents: FixtureEventApp[]
): FixtureTeamEvents => {
  const playersHasGoalEvent = new Set<number>();
  const playersHasGoalAssist = new Set<number>();
  const playersHasRedCard = new Set<number>();

  teamEvents.forEach(({ player, assist, type, detail }) => {
    if (checkIsGoalEvent({ type, detail })) {
      if (player.id) playersHasGoalEvent.add(player.id);
      if (assist.id) playersHasGoalAssist.add(assist.id);
    }
    if (checkIsRedCardEvent({ type, detail })) {
      if (player.id) playersHasRedCard.add(player.id);
    }
  });

  const allGoalsEvents = teamEvents.filter(({ type, detail }) =>
    checkIsGoalEvent({ type, detail })
  );
  const allRedCardEvents = teamEvents.filter(({ type, detail }) =>
    checkIsRedCardEvent({ type, detail })
  );

  const goals = [...playersHasGoalEvent]
    .map((playerId): FixturePlayerEvents | null => {
      const playerGoalEvents = allGoalsEvents.filter(
        ({ player }) => player.id === playerId
      );

      if (playerGoalEvents.length) {
        const [{ player }] = playerGoalEvents;
        const playerGoalEventsConverted: FixtureEventAppAlt[] =
          playerGoalEvents.map(({ id, type, detail, time }) => ({
            id,
            time,
            type,
            detail,
          }));
        return { player, events: playerGoalEventsConverted };
      }
      return null;
    })
    .filter(Boolean) as FixturePlayerEvents[];

  const assists = [...playersHasGoalAssist]
    .map((playerId): FixturePlayerEvents | null => {
      const playerGoalAssists = allGoalsEvents.filter(
        ({ assist }) => assist.id === playerId
      );

      if (playerGoalAssists.length) {
        const [{ assist }] = playerGoalAssists;
        const playerGoalAssistsConverted: FixtureEventAppAlt[] =
          playerGoalAssists.map(({ id, type, detail, time }) => ({
            id,
            time,
            type,
            detail,
          }));
        return { player: assist, events: playerGoalAssistsConverted };
      }
      return null;
    })
    .filter(Boolean) as FixturePlayerEvents[];

  const redCards = [...playersHasRedCard]
    .map((playerId): FixturePlayerEvents | null => {
      const playerRedCardEvent = allRedCardEvents.filter(
        ({ player }) => player.id === playerId
      );

      if (playerRedCardEvent.length) {
        const [{ player }] = playerRedCardEvent;
        const playerRedCardEventConverted: FixtureEventAppAlt[] =
          playerRedCardEvent.map(({ id, type, detail, time }) => ({
            id,
            time,
            type,
            detail,
          }));
        return { player, events: playerRedCardEventConverted };
      }
      return null;
    })
    .filter(Boolean) as FixturePlayerEvents[];

  return { goals, assists, redCards };
};
