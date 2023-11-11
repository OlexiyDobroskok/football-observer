import { FixtureShortStatus } from "api/helpers/consts";

export const checkIsMatchScheduled = (status: FixtureShortStatus) => {
  switch (status) {
    case "TBD":
      return true;
    case "NS":
      return true;
    default:
      return false;
  }
};

