import {
  fixtureCardType,
  fixtureEventType,
  FixtureEventType,
  fixtureGoalType,
} from "api/helpers/consts";
import { FixtureEventDetail } from "api/types/fixtures-types";

interface CheckEventArgs {
  type: FixtureEventType;
  detail: FixtureEventDetail;
}

export const checkIsGoalEvent = ({ type, detail }: CheckEventArgs) =>
  type.toLowerCase() === fixtureEventType.GOAL.toLowerCase() &&
  (detail.toLowerCase() === fixtureGoalType.NORMAL.toLowerCase() ||
    detail.toLowerCase() === fixtureGoalType.PEN.toLowerCase() ||
    detail.toLowerCase() === fixtureGoalType.OWN.toLowerCase());

export const checkIsRedCardEvent = ({ type, detail }: CheckEventArgs) =>
  type.toLowerCase() === fixtureEventType.CARD.toLowerCase() &&
  detail.toLowerCase() === fixtureCardType.RED.toLowerCase();

export const checkIsYellowCardEvent = ({ type, detail }: CheckEventArgs) =>
  type.toLowerCase() === fixtureEventType.CARD.toLowerCase() &&
  detail.toLowerCase() === fixtureCardType.YELLOW.toLowerCase();

export const checkIsSubstitutionEvent = ({ type, detail }: CheckEventArgs) =>
  type.toLowerCase() === fixtureEventType.SUBST.toLowerCase() &&
  detail.toLowerCase().includes("substitution");
