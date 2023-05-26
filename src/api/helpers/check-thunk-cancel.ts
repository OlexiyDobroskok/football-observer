import { ApiParams, DynamicRequestStatus } from "../types/global";
import { generateDynamicKey } from "./generateDynamicReqStatus";

export const checkThunkCancel = <T extends ApiParams>({
  params,
  reqStatus,
}: {
  params: T;
  reqStatus: DynamicRequestStatus | null;
}) => {
  const reqKey = generateDynamicKey({ params });
  const isLoading = !!reqStatus && reqStatus[reqKey] === "loading";
  const isSucceed = !!reqStatus && reqStatus[reqKey] === "succeeded";

  return !isLoading && !isSucceed;
};
