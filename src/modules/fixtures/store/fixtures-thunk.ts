import { createAsyncThunk } from "@reduxjs/toolkit";
import { FootballService } from "api/football-service";
import { FixturesParams, Fixture } from "api/types/fixtures-types";
import { DayFixtures } from "../types/types";
import { FixturesState } from "./fixtures-slice";
import { dayFixturesConverter } from "../helpers/day-fixtures-converter";
import { checkIsMatchFinished } from "../helpers/check-is-match-finished";
import { checkIsMatchScheduled } from "../helpers/check-is-match-scheduled";
import { checkIsMatchLive } from "../helpers/check-is-match-live";
import { checkThunkCancel } from "api/helpers/check-thunk-cancel";

export interface FixturesData {
  finished: DayFixtures[];
  scheduled: DayFixtures[];
  live: Fixture[];
  nextLiveMatch: Fixture | null;
  isLiveMatches: boolean;
}

export const fetchFixtures = createAsyncThunk<
  FixturesData,
  FixturesParams,
  {
    state: { fixtures: FixturesState };
    rejectValue: string;
  }
>(
  "fixtures/fetchFixtures",
  async (params, { rejectWithValue }) => {
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

      const isLiveMatches = !!liveMatches.length;
      let nextLiveMatch: Fixture | null = null;

      if (!isLiveMatches && scheduledMatches.length) {
        const [nextMatchDay] = scheduledMatches;
        [nextLiveMatch] = nextMatchDay.fixtures;
      }

      return {
        finished: finishedMatches,
        scheduled: scheduledMatches,
        live: liveMatches,
        nextLiveMatch,
        isLiveMatches,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (params, { getState }) => {
      const {
        fixtures: { reqStatus },
      } = getState();

      return checkThunkCancel<FixturesParams>({ params, reqStatus });
    },
  }
);
