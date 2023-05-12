import { ApiParams } from "./global";

export interface LeaguesParams extends ApiParams {
  type: "league" | "cup";
}

export interface LeagueDefinition {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface CountryDefinition {
  name: string;
  code: string;
  flag: string;
}

export interface Fixtures {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
}

export interface Coverage {
  fixtures: Fixtures;
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

export interface SeasonDefinition {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
}

export interface LeagueInformation {
  league: LeagueDefinition;
  country: CountryDefinition;
  seasons: SeasonDefinition[];
}
