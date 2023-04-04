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

export type FormChar = "W" | "L" | "D";

export interface TeamForm {
  id: string;
  result: FormChar;
}

export interface PositionReformed extends Position {
  form: TeamForm[];
}

interface LeagueInformation {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

export interface LeagueInformationReformed extends LeagueInformation {
  standings: PositionReformed[];
}

export interface LeagueInformationApiResponse extends LeagueInformation {
  standings: PositionApiResp[][];
}

export interface StandingsResponse {
  league: LeagueInformationApiResponse;
}
