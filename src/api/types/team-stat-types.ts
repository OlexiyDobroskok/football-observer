import { TeamDefinition } from "./team-types";

export interface TeamStatLeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

export interface ResultFromLocation<T> {
  home: T;
  away: T;
  total: T;
}

export interface TeamStatFixtures {
  played: ResultFromLocation<number>;
  wins: ResultFromLocation<number>;
  draws: ResultFromLocation<number>;
  loses: ResultFromLocation<number>;
}

export interface PercentageStat {
  total: number;
  percentage: string;
}

export interface MinutesStats {
  "0-15": PercentageStat;
  "16-30": PercentageStat;
  "31-45": PercentageStat;
  "46-60": PercentageStat;
  "61-75": PercentageStat;
  "76-90": PercentageStat;
  "91-105": PercentageStat;
  "106-120": PercentageStat;
}

export interface GoalsStats {
  total: ResultFromLocation<number>;
  average: ResultFromLocation<string>;
  minute: MinutesStats;
}

export interface TeamStatGoals {
  for: GoalsStats;
  against: GoalsStats;
}

export interface BiggestStreak {
  wins: number;
  draws: number;
  loses: number;
}

export interface BiggestGoals {
  for: Pick<ResultFromLocation<number>, "home" | "away">;
  against: Pick<ResultFromLocation<number>, "home" | "away">;
}

export interface TeamStatBiggest {
  streak: BiggestStreak;
  wins: Pick<ResultFromLocation<string>, "home" | "away">;
  loses: Pick<ResultFromLocation<string>, "home" | "away">;
  goals: BiggestGoals;
}

export interface TeamStatPenalty {
  scored: PercentageStat;
  missed: PercentageStat;
  total: number;
}

export interface Lineups {
  formation: string;
  played: number;
}

export interface TeamStatCards {
  yellow: MinutesStats;
  red: MinutesStats;
}

export interface TeamStatistic {
  league: TeamStatLeagueInfo;
  team: Pick<TeamDefinition, "id" | "name" | "logo">;
  form: string;
  fixtures: TeamStatFixtures;
  goals: TeamStatGoals;
  biggest: TeamStatBiggest;
  clean_sheet: ResultFromLocation<number>;
  failed_to_score: ResultFromLocation<number>;
  penalty: TeamStatPenalty;
  lineups: Lineups[];
  cards: TeamStatCards;
}
