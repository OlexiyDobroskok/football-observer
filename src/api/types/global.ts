export interface RequestStatus {
  [key: string]: "idle" | "loading" | "succeeded" | "failed";
}
