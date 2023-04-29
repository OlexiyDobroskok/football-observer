import {
  FixtureCardType,
  FixtureEventType,
  FixtureGoalType,
  FixtureShortStatus,
  FixtureStatisticType,
  FixtureVarType,
} from "api/helpers/consts";

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
  status: FixtureShortStatus | string;
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
  short: FixtureShortStatus;
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

export interface EventTime {
  elapsed: number | null;
  extra: number | null;
}

export type EventTeam = Omit<FixtureTeam, "winner">;

export interface EventPlayer {
  id: number;
  name: string;
}

export interface EventAssist {
  id: number | null;
  name: string | null;
}

export interface FixtureEvent {
  time: EventTime;
  team: EventTeam;
  player: EventPlayer;
  assist: EventAssist;
  type: FixtureEventType;
  detail: FixtureGoalType | FixtureCardType | FixtureVarType | string;
  comments: string | null;
}

export interface ShapeColor {
  primary: string;
  number: string;
  border: string;
}

export interface RolesColors {
  player: ShapeColor;
  goalkeeper: ShapeColor;
}

export interface LineupTeam extends EventTeam {
  colors: RolesColors | null;
}

export interface LineupTeamCoach {
  id: number;
  name: string;
  photo: string;
}

export interface LineupPlayerDefinition {
  id: number;
  name: string;
  number: number;
  pos: string;
  grid: string | null;
}

export interface LineupPlayer {
  player: LineupPlayerDefinition;
}

export interface FixtureTeamLineup {
  team: LineupTeam;
  formation: string;
  startXI: LineupPlayer[];
  substitutes: LineupPlayer[];
  coach: LineupTeamCoach;
}

export interface StatPlayersTeam extends EventTeam {
  update: string;
}

export interface StatPlayerInfo {
  id: number;
  name: string;
  photo: string;
}

export interface CommonPlayerGameStat {
  minutes: number;
  number: number;
  position: string;
  rating: string;
  captain: boolean;
  substitute: boolean;
}

export interface PlayerShotsStat {
  total: number;
  on: number;
}

export interface PlayerGoalsStat {
  total: number | null;
  conceded: number;
  assists: number | null;
  saves: number | null;
}

export interface PlayerPassesStat {
  total: number;
  key: number;
  accuracy: string;
}

export interface PlayerTacklesStat {
  total: number | null;
  blocks: number;
  interceptions: number;
}

export interface PlyerDuelsStat {
  total: number | null;
  won: number | null;
}

export interface PlayerDribblesStat {
  attempts: number;
  success: number;
  past: number | null;
}

export interface PlayerFoulsStat {
  drawn: number;
  committed: number;
}

export interface PlayerCardsStat {
  yellow: number;
  red: number;
}

export interface PlayerPenaltiesStat {
  won: number | null;
  commited: number | null;
  scored: number;
  missed: number;
  saved: number | null;
}

export interface PlayerGameStat {
  games: CommonPlayerGameStat;
  offsides: number | null;
  shots: PlayerShotsStat;
  goals: PlayerGoalsStat;
  passes: PlayerPassesStat;
  tackles: PlayerTacklesStat;
  duels: PlyerDuelsStat;
  dribbles: PlayerDribblesStat;
  fouls: PlayerFoulsStat;
  cards: PlayerCardsStat;
  penalty: PlayerPenaltiesStat;
}

export interface StatPlayerDefinition {
  player: StatPlayerInfo;
  statistics: PlayerGameStat[];
}

export interface FixtureTeamPlayersStat {
  team: StatPlayersTeam;
  players: StatPlayerDefinition[];
}

export interface TeamStatForm {
  type: FixtureStatisticType;
  value: number | string | null;
}

export interface FixtureTeamStat {
  team: EventTeam;
  statistics: TeamStatForm[];
}

export interface FixtureDetail extends Fixture {
  events: FixtureEvent[];
  lineups: FixtureTeamLineup[];
  players: FixtureTeamPlayersStat[];
  statistics: FixtureTeamStat[]
}
