import { createAsyncThunk } from "@reduxjs/toolkit";
import { FootballService } from "api/football-service";
import { AvailableFixtureParams, Fixture } from "api/types/fixtures-types";
import { fixturesStatus } from "src/api/helpers/consts";

export interface FixturesData {
  allFixtures: Fixture[];
  finished: Fixture[];
  scheduled: Fixture[];
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
    const finishedMatches = fixtures
      .filter(
        ({ fixture: { status } }) =>
          status.short === fixturesStatus.FT ||
          status.short === fixturesStatus.AET ||
          status.short === fixturesStatus.PEN
      )
      .sort(
        (firstFixture, secondFixture) =>
          secondFixture.fixture.timestamp - firstFixture.fixture.timestamp
      );

    const scheduledMatches = fixtures
      .filter(
        ({ fixture: { status } }) =>
          status.short === fixturesStatus.NS ||
          status.short === fixturesStatus.TBD
      )
      .sort(
        (firstFixture, secondFixture) =>
          firstFixture.fixture.timestamp - secondFixture.fixture.timestamp
      );

    const liveMatches = fixtures
      .filter(
        ({ fixture: { status } }) =>
          status.short === fixturesStatus["1H"] ||
          status.short === fixturesStatus["2H"] ||
          status.short === fixturesStatus.HT ||
          status.short === fixturesStatus.ET ||
          status.short === fixturesStatus.BT ||
          status.short === fixturesStatus.INT
      )
      .sort(
        (firstFixture, secondFixture) =>
          firstFixture.fixture.timestamp - secondFixture.fixture.timestamp
      );

    let timeToNextLiveMatch: number | null;
    let isLive: boolean;
    if (!liveMatches.length && scheduledMatches.length) {
      const [nextLiveMatch] = scheduledMatches;
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
