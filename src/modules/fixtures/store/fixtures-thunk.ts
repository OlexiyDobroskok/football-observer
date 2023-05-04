import { createAsyncThunk } from "@reduxjs/toolkit";
import { FootballService } from "api/football-service";
import { AvailableFixtureParams, Fixture } from "api/types/fixtures-types";
import { fixtureStatus } from "api/helpers/consts";
import {
  DayFixtures,
  dayFixturesConverter,
} from "../helpers/day-fixtures-converter";

export interface FixturesData {
  allFixtures: Fixture[];
  finished: DayFixtures[];
  scheduled: DayFixtures[];
  live: Fixture[];
  timeToNextLiveMatch: number | null;
  isLive: boolean;
}

export const fetchFixtures = createAsyncThunk<
  FixturesData,
  Partial<AvailableFixtureParams>,
  { rejectValue: string }
>("fixtures/fetchFixtures", async (params, { rejectWithValue }) => {
  try {
    const fixtures = await FootballService.getAvailableFixtures(params);

    const finishedMatches = dayFixturesConverter(
      fixtures.filter(
        ({ fixture: { status } }) =>
          status.short === fixtureStatus.FT ||
          status.short === fixtureStatus.AET ||
          status.short === fixtureStatus.PEN
      ),
      "DESCENDING"
    );

    const scheduledMatches = dayFixturesConverter(
      fixtures.filter(
        ({ fixture: { status } }) =>
          status.short === fixtureStatus.NS ||
          status.short === fixtureStatus.TBD
      )
    );

    const liveMatches = fixtures.filter(
      ({ fixture: { status } }) =>
        status.short === fixtureStatus["1H"] ||
        status.short === fixtureStatus["2H"] ||
        status.short === fixtureStatus.HT ||
        status.short === fixtureStatus.ET ||
        status.short === fixtureStatus.BT ||
        status.short === fixtureStatus.INT
    );

    let timeToNextLiveMatch: number | null;
    let isLive: boolean;
    if (!liveMatches.length && scheduledMatches.length) {
      const [nextMatchDay] = scheduledMatches;
      const [nextLiveMatch] = nextMatchDay.fixtures;
      const currentDate = Date.now();
      const nextLiveMatchDate = new Date(nextLiveMatch.fixture.date);
      timeToNextLiveMatch = nextLiveMatchDate.getTime() - currentDate;
      isLive = false;
    } else {
      timeToNextLiveMatch = null;
      isLive = true;
    }

    return {
      allFixtures: fixtures,
      finished: finishedMatches,
      scheduled: scheduledMatches,
      live: liveMatches,
      timeToNextLiveMatch,
      isLive,
    };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
