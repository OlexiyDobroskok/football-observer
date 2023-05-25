import { FixtureTeamLineup, LineupPlayer } from "api/types/fixtures-types";
import {
  FixtureEventApp,
  LineUpPlayerCombined,
  LineUpTeamSquad,
  TeamLineUpDefinition,
} from "../types/types";
import { sortPlayerEvents } from "./sort-player-events";
import { getPlayerLines } from "./get-players-lines";

const combineLineUpPlayerInfo = ({
  players,
  events,
}: {
  players: LineupPlayer[];
  events: FixtureEventApp[];
}): LineUpPlayerCombined[] =>
  players.map(({ player }): LineUpPlayerCombined => {
    const playerEvents = events.filter(
      ({ player: eventPlayer, assist: eventAssistant }) =>
        (!!eventPlayer.id && eventPlayer.id === player.id) ||
        (!!eventAssistant.id && eventAssistant.id === player.id)
    );
    return {
      ...player,
      photo: `https://media.api-sports.io/football/players/${player.id}.png`,
      events: sortPlayerEvents({ player, events: playerEvents }),
    };
  });

export const convertLineUps = ({
  resLineUp: { startXI, substitutes, team, coach, formation },
  events,
}: {
  resLineUp: FixtureTeamLineup;
  events: FixtureEventApp[];
}): TeamLineUpDefinition => {
  const teamSquad: LineUpTeamSquad = {
    goalkeepers: [],
    defenders: [],
    midfielders: [],
    forwards: [],
    substitutes: combineLineUpPlayerInfo({
      players: substitutes,
      events,
    }),
  };

  const startXIConverted = combineLineUpPlayerInfo({
    players: startXI,
    events,
  });

  startXIConverted.forEach((player) => {
    switch (player.pos) {
      case "G":
        teamSquad.goalkeepers = [...teamSquad.goalkeepers, player];
        break;
      case "D":
        teamSquad.defenders = [...teamSquad.defenders, player];
        break;
      case "M":
        teamSquad.midfielders = [...teamSquad.midfielders, player];
        break;
      case "F":
        teamSquad.forwards = [...teamSquad.forwards, player];
        break;
    }
  });

  return {
    team,
    formation,
    coach,
    squad: teamSquad,
    positionLines: getPlayerLines({ lineUp: startXI }),
  };
};
