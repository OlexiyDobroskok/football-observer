import {
  Fixture,
  FixtureDetailInfo,
  FixtureEvent,
} from "api/types/fixtures-types";
import { GameStatistic, TeamLocationStatus } from "api/types/global";

export interface DayFixtures {
  date: string;
  fixtures: Fixture[];
}

export interface FixtureEventApp extends FixtureEvent {
  id: string | number;
}

export interface TeamEventsDefinition {
  locationStatus: TeamLocationStatus;
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

export interface H2HStats {
  played: number;
  draws: number;
  homeTeamWinStats: GameStatistic[];
  awayTeamWinStats: GameStatistic[];
}
