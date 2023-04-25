import { FixturesAvailableStatus } from "api/helpers/consts";

interface DetailedFixtureParam {
  fixtureId: number;
}

interface DetailedFixturesParam {
  fixturesIds: string;
}

export type DetailedFixturesParams =
  | DetailedFixtureParam
  | DetailedFixturesParam;

export interface AvailableFixtureParams {
  live: "all" | string;
  date: string;
  leagueId: number;
  season: number;
  teamId: number;
  from: string;
  to: string;
  nextFixtures: number;
  lastFixtures: number;
  round: string;
  status: FixturesAvailableStatus | string;
}

export interface FixturePeriods {
  first: number | null;
  second: number | null;
}

export interface FixtureVenue {
  id: number;
  name: string;
  city: string;
}

export interface FixtureStatus {
  long: string;
  short: FixturesAvailableStatus;
  elapsed: number | null;
}

export interface FixtureDefinition {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: FixturePeriods;
  venue: FixtureVenue;
  status: FixtureStatus;
}

export interface FixtureLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

export interface FixtureTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface FixtureTeamResult {
  home: FixtureTeam;
  away: FixtureTeam;
}

export interface FixtureGoals {
  home: number | null;
  away: number | null;
}

export interface ScoreResult {
  home: number | null;
  away: number | null;
}

export interface FixtureScore {
  halftime: ScoreResult;
  fulltime: ScoreResult;
  extratime: ScoreResult;
  penalty: ScoreResult;
}

export interface Fixture {
  fixture: FixtureDefinition;
  league: FixtureLeague;
  teams: FixtureTeamResult;
  goals: FixtureGoals;
  score: FixtureScore;
}

export interface DayFixtures {
  date: string;
  fixtures: Fixture[];
}
