import {
  ApiParams,
  DynamicRequestStatus,
  RequestStatus,
} from "../types/global";

interface GenDynamicKeyArg<T extends ApiParams> {
  params: T;
}

interface GenDynamicReqStatusArgs<T extends ApiParams>
  extends GenDynamicKeyArg<T> {
  status: RequestStatus;
}

export const generateDynamicKey = <T extends ApiParams>({
  params,
}: GenDynamicKeyArg<T>) => {
  let dynamicKey = "";
  const paramsKeys = Object.keys(params);
  paramsKeys.forEach((key) => {
    const propValue = params[key];
    if (propValue) {
      dynamicKey +=
        typeof propValue === "number" ? propValue.toString() : propValue;
    }
  });

  return dynamicKey;
};

export const generateDynamicReqStatus = <T extends ApiParams>({
  params,
  status,
}: GenDynamicReqStatusArgs<T>): DynamicRequestStatus => {
  const key = generateDynamicKey({ params });

  return { [key]: status };
};
