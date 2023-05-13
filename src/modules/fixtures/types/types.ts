import {
  FixtureDetailInfo,
  FixtureEvent,
  GameStatistics,
} from "api/types/fixtures-types";

export interface FixtureEventApp extends FixtureEvent {
  id: string | number;
}

export interface TeamEventsDefinition {
  locationStatus: "HOME" | "AWAY";
  events: FixtureEventApp[];
}

export interface SortedEventsByTeamsLocationStatus {
  homeTeam: TeamEventsDefinition;
  awayTeam: TeamEventsDefinition;
}

export interface SortedEventsByTypes {
  goals: FixtureEventApp[];
  cards: FixtureEventApp[];
  subst: FixtureEventApp[];
  var: FixtureEventApp[];
}

export interface FixtureDetailInfoApp extends FixtureDetailInfo {
  events: SortedEventsByTeamsLocationStatus;
}

export type MatchesType = "FINISHED" | "SCHEDULED" | "LIVE";

export interface TeamWinStats extends GameStatistics {
  total: number;
  home: number;
  away: number;
}

export interface H2HStats {
  played: number;
  draws: number;
  homeTeamWinStats: TeamWinStats;
  awayTeamWinStats: TeamWinStats;
}
