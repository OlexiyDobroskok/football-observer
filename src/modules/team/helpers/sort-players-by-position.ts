import { TeamPlayerDefinition } from "api/types/team-types";
import { SortedTeamSquad } from "../types/types";
import { playerPositions } from "api/helpers/consts";

export const sortPlayersByPosition = (
  players: TeamPlayerDefinition[]
): SortedTeamSquad => {
  const squad: SortedTeamSquad = {
    goalkeepers: [],
    defenders: [],
    midfielders: [],
    forwards: [],
  };

  players.forEach((player) => {
    if (player.position.toLowerCase() === playerPositions.GK.toLowerCase())
      squad.goalkeepers = [...squad.goalkeepers, player];
    if (player.position.toLowerCase() === playerPositions.DEF.toLowerCase())
      squad.defenders = [...squad.defenders, player];
    if (player.position.toLowerCase() === playerPositions.MF.toLowerCase())
      squad.midfielders = [...squad.midfielders, player];
    if (player.position.toLowerCase() === playerPositions.ATT.toLowerCase())
      squad.forwards = [...squad.forwards, player];
  });

  return squad;
};
