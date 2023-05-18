import { createAsyncThunk } from "@reduxjs/toolkit";
import { FootballService } from "api/football-service";
import { FixturesParams, Fixture } from "api/types/fixtures-types";
import { DayFixtures } from "../types/types";
import { FixturesState } from "./fixtures-slice";
import { dayFixturesConverter } from "../helpers/day-fixtures-converter";
import { checkIsMatchFinished } from "../helpers/checkIsMatchFinished";
import { checkIsMatchScheduled } from "../helpers/checkIsMatchScheduled";
import { checkIsMatchLive } from "../helpers/checkIsMatchLive";
import { generateDynamicKey } from "api/helpers/generateDynamicReqStatus";

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
      const reqKey = generateDynamicKey({ params });
      const isLoading = !!reqStatus && reqStatus[reqKey] === "loading";
      const isSucceed = !!reqStatus && reqStatus[reqKey] === "succeeded";
      if (isLoading || isSucceed) return false;
    },
  }
);
