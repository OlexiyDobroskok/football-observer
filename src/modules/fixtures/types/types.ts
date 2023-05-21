import {
  EventPlayer,
  Fixture,
  FixtureDetailInfo,
  FixtureEvent,
} from "api/types/fixtures-types";
import { GameStatistic } from "api/types/global";

export interface DayFixtures {
  date: string;
  fixtures: Fixture[];
}

export interface FixtureEventApp extends FixtureEvent {
  id: string | number;
}

export interface FixtureTeamsEvents {
  homeTeam: FixtureEventApp[];
  awayTeam: FixtureEventApp[];
}

export type FixtureEventAppAlt = Omit<
  FixtureEventApp,
  "comments" | "player" | "assist" | "team"
>;

export interface FixturePlayerEvents {
  player: EventPlayer;
  events: FixtureEventAppAlt[];
}

export interface FixtureTeamEvents {
  goals: FixturePlayerEvents[];
  assists: FixturePlayerEvents[];
  redCards: FixturePlayerEvents[];
}

export interface FixtureTeamsEventsAlt {
  homeTeamEvents: FixtureTeamEvents;
  awayTeamEvents: FixtureTeamEvents;
}

export interface FixtureDetailInfoApp extends FixtureDetailInfo {
  events: FixtureTeamsEvents;
}

export interface H2HStats {
  played: number;
  draws: number;
  homeTeamWinStats: GameStatistic[];
  awayTeamWinStats: GameStatistic[];
}
