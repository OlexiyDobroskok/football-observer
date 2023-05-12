import { createSlice } from "@reduxjs/toolkit";
import { Fixture } from "api/types/fixtures-types";
import { fetchFixtures } from "./fixtures-thunk";
import { DayFixtures } from "../helpers/day-fixtures-converter";
import { DynamicRequestStatus } from "api/types/global";
import { generateDynamicReqStatus } from "api/helpers/generateDynamicReqStatus";

export interface FixturesState {
  availableFixtures: Fixture[];
  finishedMatches: DayFixtures[];
  liveMatches: Fixture[];
  scheduledMatches: DayFixtures[];
  timeToNextLiveMatch: number | null;
  isLive: boolean | undefined;
  timerId: number | null;
  isLoading: boolean;
  error: string | null;
  reqStatus: DynamicRequestStatus | null;
  reqLocation: string | null;
}

const initialState: FixturesState = {
  availableFixtures: [],
  finishedMatches: [],
  liveMatches: [],
  scheduledMatches: [],
  timeToNextLiveMatch: null,
  isLive: undefined,
  timerId: null,
  isLoading: false,
  error: null,
  reqStatus: null,
  reqLocation: null,
};

const fixturesSlice = createSlice({
  name: "fixtures",
  initialState,
  reducers: {
    resetFixturesReqStatus: (state) => {
      state.reqStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixtures.pending, (state, { meta }) => {
        state.reqLocation = window.location.pathname;
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "loading",
        });
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFixtures.fulfilled, (state, { payload, meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "succeeded",
        });
        const {
          allFixtures,
          finished,
          scheduled,
          live,
          timeToNextLiveMatch,
          isLive,
          timerId,
        } = payload;
        state.availableFixtures = allFixtures;
        state.finishedMatches = finished;
        state.scheduledMatches = scheduled;
        state.liveMatches = live;
        state.timeToNextLiveMatch = timeToNextLiveMatch;
        state.isLive = isLive;
        state.timerId = timerId;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFixtures.rejected, (state, { payload, error, meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "failed",
        });
        state.isLoading = false;
        state.error = payload ? payload : error.message ? error.message : "";
      });
  },
});

export const { resetFixturesReqStatus } = fixturesSlice.actions;

export const fixturesReducer = fixturesSlice.reducer;
