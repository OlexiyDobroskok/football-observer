import { createSlice } from "@reduxjs/toolkit";
import { FixtureDetailInfoApp } from "src/api/types/fixtures-types";
import { fetchFixtureDetail } from "./fixture-detail-thunk";
import { checkIsMatchLive } from "../helpers/checkIsMatchLive";
import { checkIsMatchScheduled } from "../helpers/checkIsMatchScheduled";
import { checkIsMatchFinished } from "../helpers/checkIsMatchFinished";
import { convertEvents } from "../helpers/convertEvents";
import { getTimeToMatch } from "../helpers/getTimeToMatch";

interface FixtureDetailState {
  fixtureDetail: FixtureDetailInfoApp | undefined;
  isLive: boolean;
  isScheduled: boolean;
  timeToMatch: number | null;
  isFinished: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: FixtureDetailState = {
  fixtureDetail: undefined,
  isLive: false,
  isScheduled: false,
  timeToMatch: null,
  isFinished: false,
  isLoading: false,
  error: null,
};

export const fixtureDetailSlice = createSlice({
  name: "fixture-detail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixtureDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFixtureDetail.fulfilled, (state, { payload }) => {
        const homeTeamId = payload.teams.home.id;
        const awayTeamId = payload.teams.away.id;
        state.fixtureDetail = {
          ...payload,
          events: convertEvents({
            homeTeamId,
            awayTeamId,
            events: payload.events,
          }),
        };
        const matchStatus = payload.fixture.status.short;
        state.isLive = checkIsMatchLive(matchStatus);
        state.isScheduled = checkIsMatchScheduled(matchStatus);
        state.timeToMatch = getTimeToMatch(payload.fixture.date);
        state.isFinished = checkIsMatchFinished(matchStatus);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFixtureDetail.rejected, (state, { payload, error }) => {
        state.isLoading = false;
        state.error = payload ? payload : error.message ? error.message : "";
      });
  },
});

export const fixtureDetailReducer = fixtureDetailSlice.reducer;
