import { FixtureShortStatus } from "api/helpers/consts";

export const checkIsMatchLive = (status: FixtureShortStatus) => {
  switch (status) {
    case "1H":
      return true;
    case "2H":
      return true;
    case "HT":
      return true;
    case "ET":
      return true;
    case "BT":
      return true;
    case "P":
      return true;
    case "INT":
      return true;
    case "LIVE":
      return true;
    default:
      return false;
  }
};
