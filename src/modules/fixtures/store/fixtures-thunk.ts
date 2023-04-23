import { createAsyncThunk } from "@reduxjs/toolkit";
import { FootballService } from "api/football-service";
import {
  AvailableFixtureParams,
  DayFixtures,
  Fixture,
} from "api/types/fixtures-types";
import { fixturesStatus } from "src/api/helpers/consts";
import { sortDayFixtures } from "../helpers/sort-day-fixtures";

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
    const finishedMatches = fixtures.filter(
      ({ fixture: { status } }) =>
        status.short === fixturesStatus.FT ||
        status.short === fixturesStatus.AET ||
        status.short === fixturesStatus.AET ||
        status.short === fixturesStatus.PEN
    );
    const finishedMatchesConverted = sortDayFixtures(
      finishedMatches,
      "DESCENDING"
    );
    const scheduledMatches = fixtures.filter(
      ({ fixture: { status } }) =>
        status.short === fixturesStatus.NS ||
        status.short === fixturesStatus.TBD
    );
    const scheduledMatchesConverted = sortDayFixtures(scheduledMatches);
    const liveMatches = fixtures.filter(
      ({ fixture: { status } }) =>
        status.short === fixturesStatus["1H"] ||
        status.short === fixturesStatus["2H"] ||
        status.short === fixturesStatus.HT ||
        status.short === fixturesStatus.ET ||
        status.short === fixturesStatus.BT ||
        status.short === fixturesStatus.INT
    );

    let timeToNextLiveMatch: number | null;
    let isLive: boolean;
    if (!liveMatches.length && scheduledMatchesConverted.length) {
      const [nextLiveMatch] = scheduledMatchesConverted;
      const currentDate = Date.now();
      const nextLiveMatchDate = new Date(nextLiveMatch.date);
      timeToNextLiveMatch = nextLiveMatchDate.getTime() - currentDate;
      isLive = false;
    } else {
      timeToNextLiveMatch = null;
      isLive = true;
    }

    return {
      allFixtures: fixtures,
      finished: finishedMatchesConverted,
      scheduled: scheduledMatchesConverted,
      live: liveMatches,
      timeToNextLiveMatch,
      isLive,
    };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
