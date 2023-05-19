import { FixtureStatisticType } from "../helpers/consts";

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface DynamicRequestStatus {
  [key: string]: RequestStatus;
}

export interface ApiParams {
  [key: string]: number | string | undefined;
}

export type GameStatisticValue = number | string | null;

export type TeamLocationStatus = "HOME" | "AWAY";

export type WinStatistic = "Total" | "Home" | "Away";
export type MatchStatisticType = WinStatistic | FixtureStatisticType;

export interface GameStatistic {
  type: MatchStatisticType;
  value: GameStatisticValue;
}
