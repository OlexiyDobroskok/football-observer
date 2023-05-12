import { createSlice } from "@reduxjs/toolkit";
import { FixtureDetailInfoApp } from "src/api/types/fixtures-types";
import { fetchFixtureDetail } from "./fixture-detail-thunk";
import { DynamicRequestStatus } from "api/types/global";
import { generateDynamicReqStatus } from "api/helpers/generateDynamicReqStatus";

export interface FixtureDetailState {
  fixtureDetail: FixtureDetailInfoApp | undefined;
  homeTeamId: number | undefined;
  awayTeamId: number | undefined;
  isLive: boolean;
  isScheduled: boolean;
  timeToMatch: number | null;
  isFinished: boolean;
  isLoading: boolean;
  error: string | null;
  timerId: number | null;
  reqStatus: DynamicRequestStatus | null;
  reqLocation: string | null;
}

const initialState: FixtureDetailState = {
  fixtureDetail: undefined,
  homeTeamId: undefined,
  awayTeamId: undefined,
  isLive: false,
  isScheduled: false,
  timeToMatch: null,
  isFinished: false,
  isLoading: false,
  error: null,
  timerId: null,
  reqStatus: null,
  reqLocation: null,
};

export const fixtureDetailSlice = createSlice({
  name: "fixture-detail",
  initialState,
  reducers: {
    resetFixtureDetailReqStatus: (state) => {
      state.reqStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixtureDetail.pending, (state, { meta }) => {
        state.reqLocation = window.location.pathname;
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "loading",
        });
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFixtureDetail.fulfilled, (state, { payload, meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "succeeded",
        });
        const {
          fixtureDetail,
          homeTeamId,
          awayTeamId,
          isLive,
          isFinished,
          isScheduled,
          timeToMatch,
          timerId,
        } = payload;
        state.fixtureDetail = fixtureDetail;
        state.homeTeamId = homeTeamId;
        state.awayTeamId = awayTeamId;
        state.isLive = isLive;
        state.isFinished = isFinished;
        state.isScheduled = isScheduled;
        state.timeToMatch = timeToMatch;
        state.timerId = timerId;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchFixtureDetail.rejected,
        (state, { payload, error, meta }) => {
          state.reqStatus = generateDynamicReqStatus({
            params: meta.arg,
            status: "succeeded",
          });
          state.isLoading = false;
          state.error = payload ? payload : error.message ? error.message : "";
        }
      );
  },
});

export const { resetFixtureDetailReqStatus } = fixtureDetailSlice.actions;

export const fixtureDetailReducer = fixtureDetailSlice.reducer;
