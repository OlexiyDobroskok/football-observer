import { fixtureGoalType } from "api/helpers/consts";
import { EventTime, FixtureEventDetail } from "api/types/fixtures-types";

export const getEventTimeDescription = (time: EventTime) =>
  time.extra && time.elapsed
    ? `${time.elapsed}'+${time.extra}'`
    : time.elapsed
    ? `${time.elapsed}'`
    : "";

export const getGoalDescription = ({
  time,
  detail,
}: {
  time: EventTime;
  detail: FixtureEventDetail;
}) => {
  const goalTime = getEventTimeDescription(time);

  const goalDetail =
    detail.toLowerCase() === fixtureGoalType.PEN.toLowerCase()
      ? "(P)"
      : detail.toLowerCase() === fixtureGoalType.OWN.toLowerCase()
      ? "(A)"
      : "";
  return `${goalTime} ${goalDetail}`;
};
