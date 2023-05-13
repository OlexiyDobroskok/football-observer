export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface DynamicRequestStatus {
  [key: string]: RequestStatus;
}

export interface ApiParams {
  [key: string]: number | string | undefined;
}

export type GameStatisticValue = number | string | null;

export interface GameStatistics {
  [key: string]: GameStatisticValue;
}

export type TeamLocationStatus = "HOME" | "AWAY";
