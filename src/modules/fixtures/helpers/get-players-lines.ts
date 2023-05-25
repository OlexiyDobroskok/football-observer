import { LineupPlayer } from "api/types/fixtures-types";
import { PlayerLines } from "../types/types";

export const getPlayerLines = ({ lineUp }: { lineUp: LineupPlayer[] }) => {
  const playerLines: PlayerLines = {
    first: [],
    second: [],
    third: [],
    fourth: [],
    fifth: [],
  };

  lineUp.forEach(({ player }) => {
    if (player.grid) {
      const [line] = player.grid.split(":");
      switch (line) {
        case "1":
          playerLines.first = [...playerLines.first, player];
          break;
        case "2":
          playerLines.second = [...playerLines.second, player];
          break;
        case "3":
          playerLines.third = [...playerLines.third, player];
          break;
        case "4":
          playerLines.fourth = [...playerLines.fourth, player];
          break;
        case "5":
          playerLines.fifth = [...playerLines.fifth, player];
          break;
      }
    }
  });

  return playerLines;
};
