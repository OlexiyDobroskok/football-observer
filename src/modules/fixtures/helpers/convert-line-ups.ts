import { FixtureTeamLineup, LineupPlayer } from "api/types/fixtures-types";
import { TeamSquadApi } from "api/types/team-types";
import {
  FixtureEventApp,
  LineUpPlayerCombined,
  TeamLineUp,
} from "../types/types";
import { sortPlayerEvents } from "./sort-player-events";

const combineLineUpPlayerInfo = ({
  players,
  squad,
  events,
}: {
  players: LineupPlayer[];
  squad: TeamSquadApi;
  events: FixtureEventApp[];
}): LineUpPlayerCombined[] => {
  return players.map(({ player }): LineUpPlayerCombined => {
    const squadPlayer = squad.players.find(
      (squadPlayer) => squadPlayer.id === player.id
    );
    const playerEvents = events.filter(
      ({ player: eventPlayer, assist: eventAssistant }) =>
        (!!eventPlayer.id && eventPlayer.id === player.id) ||
        (!!eventAssistant.id && eventAssistant.id === player.id)
    );
    return {
      ...player,
      photo: squadPlayer ? squadPlayer.photo : null,
      events: sortPlayerEvents({ player, events: playerEvents }),
    };
  });
};

export const convertLineUps = ({
  resLineUp: { startXI, substitutes },
  squad,
  events,
}: {
  resLineUp: FixtureTeamLineup;
  squad: TeamSquadApi;
  events: FixtureEventApp[];
}) => {
  const lineUp: TeamLineUp = {
    goalkeepers: [],
    defenders: [],
    midfielders: [],
    forwards: [],
    substitutes: combineLineUpPlayerInfo({
      players: substitutes,
      squad,
      events,
    }),
  };

  const startXIConverted = combineLineUpPlayerInfo({
    players: startXI,
    squad,
    events,
  });

  startXIConverted.forEach((player) => {
    switch (player.pos) {
      case "G":
        lineUp.goalkeepers = [...lineUp.goalkeepers, player];
        break;
      case "D":
        lineUp.defenders = [...lineUp.defenders, player];
        break;
      case "M":
        lineUp.midfielders = [...lineUp.midfielders, player];
        break;
      case "F":
        lineUp.forwards = [...lineUp.forwards, player];
        break;
    }
  });

  return lineUp;
};
