import { createAsyncThunk } from "@reduxjs/toolkit";
import { FootballService } from "api/football-service";
import { AvailableFixtureParams, Fixture } from "api/types/fixtures-types";
import {
  DayFixtures,
  dayFixturesConverter,
} from "../helpers/day-fixtures-converter";
import { checkIsMatchFinished } from "../helpers/checkIsMatchFinished";
import { checkIsMatchScheduled } from "../helpers/checkIsMatchScheduled";
import { checkIsMatchLive } from "../helpers/checkIsMatchLive";
import { getTimeToMatch } from "../helpers/getTimeToMatch";

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
      fixtures.filter(({ fixture: { status } }) =>
        checkIsMatchFinished(status.short)
      ),
      "DESCENDING"
    );

    const scheduledMatches = dayFixturesConverter(
      fixtures.filter(({ fixture: { status } }) =>
        checkIsMatchScheduled(status.short)
      )
    );

    const liveMatches = fixtures.filter(({ fixture: { status } }) =>
      checkIsMatchLive(status.short)
    );

    let timeToNextLiveMatch: number | null;
    let isLive: boolean;
    if (!liveMatches.length && scheduledMatches.length) {
      const [nextMatchDay] = scheduledMatches;
      const [nextLiveMatch] = nextMatchDay.fixtures;
      timeToNextLiveMatch = getTimeToMatch(nextLiveMatch.fixture.date);
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
