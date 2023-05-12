import { createAsyncThunk } from "@reduxjs/toolkit";
import { FootballService } from "api/football-service";
import { FixturesParams, Fixture } from "api/types/fixtures-types";
import {
  DayFixtures,
  dayFixturesConverter,
} from "../helpers/day-fixtures-converter";
import { checkIsMatchFinished } from "../helpers/checkIsMatchFinished";
import { checkIsMatchScheduled } from "../helpers/checkIsMatchScheduled";
import { checkIsMatchLive } from "../helpers/checkIsMatchLive";
import { getTimeToMatch } from "../helpers/getTimeToMatch";
import { FixturesState, resetFixturesReqStatus } from "./fixtures-slice";
import { AppDispatch } from "store/store";
import { generateDynamicKey } from "api/helpers/generateDynamicReqStatus";

export interface FixturesData {
  allFixtures: Fixture[];
  finished: DayFixtures[];
  scheduled: DayFixtures[];
  live: Fixture[];
  timeToNextLiveMatch: number | null;
  isLive: boolean;
  timerId: number | null;
}

export const fetchFixtures = createAsyncThunk<
  FixturesData,
  FixturesParams,
  {
    state: { fixtures: FixturesState };
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(
  "fixtures/fetchFixtures",
  async (params, { getState, dispatch, rejectWithValue }) => {
    try {
      const { fixtures: fixturesState } = getState();
      if (fixturesState.timerId) window.clearTimeout(fixturesState.timerId);

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

      let timerId: number | null = null;

      if (!isLive && timeToNextLiveMatch) {
        timerId = window.setTimeout(() => {
          dispatch(resetFixturesReqStatus());
          dispatch(fetchFixtures(params));
        }, timeToNextLiveMatch);
      }

      if (isLive) {
        timerId = window.setTimeout(() => {
          dispatch(resetFixturesReqStatus());
          dispatch(fetchFixtures(params));
        }, 30000);
      }

      return {
        allFixtures: fixtures,
        finished: finishedMatches,
        scheduled: scheduledMatches,
        live: liveMatches,
        timeToNextLiveMatch,
        isLive,
        timerId,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (params, { getState }) => {
      const {
        fixtures: { reqStatus, reqLocation, timerId },
      } = getState();
      const reqKey = generateDynamicKey({ params });
      const isLoading = !!reqStatus && reqStatus[reqKey] === "loading";
      const isSucceed = !!reqStatus && reqStatus[reqKey] === "succeeded";
      const currentLocation = window.location.pathname;
      if (!!reqLocation && !!timerId && currentLocation !== reqLocation) {
        window.clearTimeout(timerId);
        return false;
      }
      if (isLoading || isSucceed) return false;
    },
  }
);
