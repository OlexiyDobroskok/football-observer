import { TeamPlayerDefinition, TeamSquadApi } from "api/types/team-types";

export interface SortedTeamSquad {
  goalkeepers: TeamPlayerDefinition[];
  defenders: TeamPlayerDefinition[];
  midfielders: TeamPlayerDefinition[];
  forwards: TeamPlayerDefinition[];
}

export interface TeamSquadApp extends Pick<TeamSquadApi, "team"> {
  players: SortedTeamSquad;
}

export interface ComparativeTeamsSquadApp {
  homeTeamSquad: TeamSquadApp;
  awayTeamSquad: TeamSquadApp;
}
