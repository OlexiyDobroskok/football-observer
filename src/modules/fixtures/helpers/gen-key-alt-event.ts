import { FixturePlayerEvents } from "../types/types";

export const genKeyAltEvent = ({ player, events }: FixturePlayerEvents) => {
  return events
    .map(({ id }) => id)
    .join("")
    .concat(player.id ? player.id.toString() : "");
};
