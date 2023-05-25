import {
  EventPlayer,
  Fixture,
  FixtureDetailInfo,
  FixtureEvent,
  FixtureTeamLineup,
  LineupPlayerDefinition,
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

export interface FixtureEventPlayer {
  player: EventPlayer;
  events: FixtureEventAppAlt[];
}

export interface FixtureEventPlayers {
  goals: FixtureEventPlayer[];
  assists: FixtureEventPlayer[];
  redCards: FixtureEventPlayer[];
  yellowCards?: FixtureEventPlayer[];
  substitutionIn?: FixtureEventPlayer[];
  substitutionOut?: FixtureEventPlayer[];
}

export interface FixtureTeamsEventsAlt {
  homeTeamEvents: FixtureEventPlayers;
  awayTeamEvents: FixtureEventPlayers;
}

export interface SortedPlayerEvents {
  goals: FixtureEventApp[];
  assists: FixtureEventApp[];
  redCards: FixtureEventApp[];
  yellowCards: FixtureEventApp[];
  substitutionIn: FixtureEventApp[];
  substitutionOut: FixtureEventApp[];
}

export interface LineUpPlayerCombined extends LineupPlayerDefinition {
  photo: string | null;
  events: SortedPlayerEvents | null;
}

export interface LineUpTeamSquad {
  goalkeepers: LineUpPlayerCombined[];
  defenders: LineUpPlayerCombined[];
  midfielders: LineUpPlayerCombined[];
  forwards: LineUpPlayerCombined[];
  substitutes: LineUpPlayerCombined[];
}

export interface PlayerLines {
  first: LineupPlayerDefinition[];
  second: LineupPlayerDefinition[];
  third: LineupPlayerDefinition[];
  fourth: LineupPlayerDefinition[];
  fifth: LineupPlayerDefinition[];
}

export interface TeamLineUpDefinition
  extends Omit<FixtureTeamLineup, "startXI" | "substitutes"> {
  squad: LineUpTeamSquad;
  positionLines: PlayerLines;
}

export interface ComparativeTeamsLineUps {
  homeTeamLineUps: TeamLineUpDefinition;
  awayTeamLineUps: TeamLineUpDefinition;
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
