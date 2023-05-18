import { createSlice } from "@reduxjs/toolkit";
import { Fixture } from "api/types/fixtures-types";
import { fetchFixtures } from "./fixtures-thunk";
import { DayFixtures } from "../types/types";
import { DynamicRequestStatus } from "api/types/global";
import { generateDynamicReqStatus } from "api/helpers/generateDynamicReqStatus";

export interface FixturesState {
  finishedMatches: DayFixtures[] | undefined;
  liveMatches: Fixture[] | undefined;
  scheduledMatches: DayFixtures[] | undefined;
  isLiveMatches: boolean | undefined;
  nextLiveMatch: Fixture | null | undefined;
  isLoading: boolean;
  error: string | null;
  reqStatus: DynamicRequestStatus | null;
}

const initialState: FixturesState = {
  finishedMatches: undefined,
  liveMatches: undefined,
  scheduledMatches: undefined,
  isLiveMatches: undefined,
  nextLiveMatch: undefined,
  isLoading: false,
  error: null,
  reqStatus: null,
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
        const { finished, scheduled, live, nextLiveMatch, isLiveMatches } =
          payload;
        state.finishedMatches = finished;
        state.scheduledMatches = scheduled;
        state.liveMatches = live;
        state.nextLiveMatch = nextLiveMatch;
        state.isLiveMatches = isLiveMatches;
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
