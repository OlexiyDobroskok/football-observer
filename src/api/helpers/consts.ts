export const fixtureStatus = {
  TBD: "TBD",
  NS: "NS",
  "1H": "1H",
  HT: "HT",
  "2H": "2H",
  ET: "ET",
  BT: "BT",
  P: "P",
  SUSP: "SUSP",
  INT: "INT",
  FT: "FT",
  AET: "AET",
  PEN: "PEN",
  PST: "PST",
  CANC: "CANC",
  ABD: "ABD",
  AWD: "AWD",
  WO: "WO",
  LIVE: "LIVE",
} as const;

type FixtureShortStatusKey = keyof typeof fixtureStatus;
export type FixtureShortStatus = (typeof fixtureStatus)[FixtureShortStatusKey];

export const fixtureEventType = {
  GOAL: "Goal",
  CARD: "Card",
  SUBST: "Subst",
  VAR: "Var",
} as const;

type FixtureEventTypeKey = keyof typeof fixtureEventType;
export type FixtureEventType = (typeof fixtureEventType)[FixtureEventTypeKey];

export const fixtureGoalType = {
  NORMAL: "Normal Goal",
  OWN: "Own Goal",
  PEN: "Penalty",
  MISS_PEN: "Missed Penalty",
} as const;

type FixtureGoalTypeKey = keyof typeof fixtureGoalType;
export type FixtureGoalType = (typeof fixtureGoalType)[FixtureGoalTypeKey];

export const fixtureCardType = {
  YELLOW: "Yellow Card",
  RED: "Red Card",
} as const;

type FixtureCardTypeKey = keyof typeof fixtureCardType;
export type FixtureCardType = (typeof fixtureCardType)[FixtureCardTypeKey];

export const fixtureVarType = {
  GOAL_CANC: "Goal cancelled",
  PEN_CONF: "Penalty confirmed",
} as const;

type FixtureVarTypeKey = keyof typeof fixtureVarType;
export type FixtureVarType = (typeof fixtureVarType)[FixtureVarTypeKey];

export const fixtureStatisticType = {
  shotsOnGoal: "Shots on Goal",
  shotsOfGoal: "Shots off Goal",
  shotsInsideBox: "Shots insidebox",
  shotsOutsideBox: "Shots outsidebox",
  totalShots: "Total Shots",
  blockedShots: "Blocked Shots",
  fouls: "Fouls",
  cornerKicks: "Corner Kicks",
  offsides: "Offsides",
  ballPossession: "Ball Possession",
  yellowCards: "Yellow Cards",
  redCards: "Red Cards",
  goalkeeperSaves: "Goalkeeper Saves",
  totalPasses: "Total passes",
  passesAccurate: "Passes accurate",
  passesPercent: "Passes %",
  expectedGoals: "Expected Goals",
} as const;

type FixtureStatisticTypeKey = keyof typeof fixtureStatisticType;
export type FixtureStatisticType =
  (typeof fixtureStatisticType)[FixtureStatisticTypeKey];

export const playerPositions = {
  GK: "Goalkeeper",
  DEF: "Defender",
  MF: "Midfielder",
  ATT: "Attacker",
} as const;

export type PlayerPosition =
  (typeof playerPositions)[keyof typeof playerPositions];

export const playerPositionsShort = {
  G: "G",
  D: "D",
  M: "M",
  F: "F",
} as const;

export type PlayerPositionsShort =
  (typeof playerPositionsShort)[keyof typeof playerPositionsShort];

export const locationStatus = {
  home: "HOME",
  away: "AWAY",
} as const;

export type LocationStatus =
  (typeof locationStatus)[keyof typeof locationStatus];
