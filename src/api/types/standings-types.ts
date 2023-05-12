import { ApiParams } from "./global";

export interface StandingsParams extends ApiParams {
  leagueId: number;
  season: number;
}

export interface Goals {
  for: number;
  against: number;
}

export interface MatchesStat {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface Position {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  status: string;
  description: string;
  all: MatchesStat;
  home: MatchesStat;
  away: MatchesStat;
  update: string;
}

export interface PositionApiResp extends Position {
  form: string;
}

export interface LeagueStandings {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

export interface LeagueStandingsApiResponse extends LeagueStandings {
  standings: PositionApiResp[][];
}

export interface StandingsResponse {
  league: LeagueStandingsApiResponse;
}
