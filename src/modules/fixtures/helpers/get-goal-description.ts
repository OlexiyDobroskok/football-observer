import { FixtureEventApp } from "api/types/fixtures-types";
import { fixtureGoalType } from "api/helpers/consts";

export const getGoalDescription = ({ time, detail }: FixtureEventApp) => {
  const goalTime = time.elapsed ? time.elapsed : time.extra ? time.extra : "";
  const goalDetail =
    detail.toLowerCase() === fixtureGoalType.PEN.toLowerCase()
      ? "(P)"
      : detail.toLowerCase() === fixtureGoalType.OWN.toLowerCase()
      ? "(A)"
      : "";
  return `${goalTime}'${goalDetail}`;
};
