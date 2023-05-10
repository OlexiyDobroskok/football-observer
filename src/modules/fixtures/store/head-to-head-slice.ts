import { createSlice } from "@reduxjs/toolkit";
import { Fixture, GameStatistics } from "src/api/types/fixtures-types";
import { fetchHeadToHeadFixtureInfo } from "./head-to-head-thunk";

export interface TeamWinStats extends GameStatistics {
  total: number;
  home: number;
  away: number;
}

export interface H2HStats {
  played: number;
  draws: number;
  homeTeamWinStats: TeamWinStats;
  awayTeamWinStats: TeamWinStats;
}

interface HeadToHeadState {
  headToHeadFixtures: Fixture[] | undefined;
  headToHeadStats: H2HStats | undefined;
  isLoading: boolean;
  error: string | null;
}

const initialState: HeadToHeadState = {
  headToHeadFixtures: undefined,
  headToHeadStats: undefined,
  isLoading: false,
  error: null,
};

const headToHeadSlice = createSlice({
  name: "headToHead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeadToHeadFixtureInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHeadToHeadFixtureInfo.fulfilled, (state, { payload }) => {
        state.headToHeadFixtures = payload.fixtures;
        state.headToHeadStats = payload.stats;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchHeadToHeadFixtureInfo.rejected,
        (state, { payload, error }) => {
          state.isLoading = false;
          state.error = payload ? payload : error.message ? error.message : "";
        }
      );
  },
});

export const headToHeadReducer = headToHeadSlice.reducer;
