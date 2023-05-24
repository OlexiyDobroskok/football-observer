import { FixtureEventPlayer } from "../types/types";

export const genKeyAltEvent = ({ player, events }: FixtureEventPlayer) => {
  return events
    .map(({ id }) => id)
    .join("")
    .concat(player.id ? player.id.toString() : "");
};
