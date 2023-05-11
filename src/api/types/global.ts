export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface DynamicRequestStatus {
  [key: string]: RequestStatus;
}
