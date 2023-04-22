export const fixturesStatus = {
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

export type FixturesAvailableStatus = keyof typeof fixturesStatus;
