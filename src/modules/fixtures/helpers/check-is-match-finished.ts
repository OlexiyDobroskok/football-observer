import { FixtureShortStatus } from "api/helpers/consts";

export const checkIsMatchFinished = (status: FixtureShortStatus) => {
  switch (status) {
    case "FT":
      return true;
    case "AET":
      return true;
    case "PEN":
      return true;
    default:
      return false;
  }
};
