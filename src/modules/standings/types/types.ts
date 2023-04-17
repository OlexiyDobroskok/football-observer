import { LeagueStandings, Position } from "api/standings-types";

export type FormChar = "W" | "L" | "D";

export interface TeamForm {
  id: string;
  result: FormChar;
}

export interface PositionReformed extends Position {
  form: TeamForm[];
}

export interface LeagueStandingsReformed extends LeagueStandings {
  standings: PositionReformed[];
}
