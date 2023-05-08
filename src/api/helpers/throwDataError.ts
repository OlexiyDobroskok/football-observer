import { DataError } from "../football-service";

export const throwDataError = (error: DataError) => {
  let errorMsg = "";
  for (const key in error) {
    errorMsg = error[key];
  }
  throw new Error(errorMsg);
};
