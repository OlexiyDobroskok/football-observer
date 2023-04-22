import { createAsyncThunk } from "@reduxjs/toolkit";
import { FootballService } from "api/football-service";
import {
  AvailableFixtureParams,
  DayFixtures,
  Fixture,
} from "api/types/fixtures-types";
import { AppDispatch } from "src/store/store";
import { fixturesStatus } from "src/api/helpers/consts";
import { sortDayFixtures } from "../helpers/sort-day-fixtures";

export interface FixturesData {
  allFixtures: Fixture[];
  finished: DayFixtures[];
  scheduled: DayFixtures[];
  live: Fixture[];
  timeToNextLiveMatch: number | null;
}

export const fetchFixtures = createAsyncThunk<
  FixturesData,
  Partial<AvailableFixtureParams>,
  { rejectValue: string; dispatch: AppDispatch }
>("fixtures/fetchFixtures", async (params, { rejectWithValue, dispatch }) => {
  try {
    const fixtures = await FootballService.getAvailableFixtures(params);
    const finishedMatches = fixtures.filter(
      ({ fixture: { status } }) =>
        status.short === fixturesStatus.FT ||
        status.short === fixturesStatus.AET ||
        status.short === fixturesStatus.AET ||
        status.short === fixturesStatus.PEN
    );
    const finishedMatchesConverted = sortDayFixtures(finishedMatches);
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
    if (!liveMatches.length && scheduledMatchesConverted.length) {
      const [nextLiveMatch] = scheduledMatchesConverted;
      const currentDate = Date.now();
      const nextLiveMatchDate = new Date(nextLiveMatch.date);
      timeToNextLiveMatch = nextLiveMatchDate.getTime() - currentDate;
    } else {
      timeToNextLiveMatch = null;
    }

    return {
      allFixtures: fixtures,
      finished: finishedMatchesConverted,
      scheduled: scheduledMatchesConverted,
      live: liveMatches,
      timeToNextLiveMatch,
    };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
