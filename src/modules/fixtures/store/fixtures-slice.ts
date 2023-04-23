import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayFixtures, Fixture } from "api/types/fixtures-types";
import { fetchFixtures } from "modules/fixtures/store/fixtures-thunk";

interface FixturesState {
  availableFixtures: Fixture[];
  finishedMatches: DayFixtures[];
  liveMatches: Fixture[];
  scheduledMatches: DayFixtures[];
  timeToNextLiveMatch: number | null | undefined;
  isLive: boolean | undefined;
  isLoading: boolean;
  error: string | null;
}

const initialState: FixturesState = {
  availableFixtures: [],
  finishedMatches: [],
  liveMatches: [],
  scheduledMatches: [],
  timeToNextLiveMatch: undefined,
  isLive: undefined,
  isLoading: false,
  error: null,
};

const fixturesSlice = createSlice({
  name: "fixtures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixtures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFixtures.fulfilled, (state, { payload }) => {
        const {
          allFixtures,
          finished,
          scheduled,
          live,
          timeToNextLiveMatch,
          isLive,
        } = payload;
        state.availableFixtures = allFixtures;
        state.finishedMatches = finished;
        state.scheduledMatches = scheduled;
        state.liveMatches = live;
        state.timeToNextLiveMatch = timeToNextLiveMatch;
        state.isLive = isLive;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFixtures.rejected, (state, { payload, error }) => {
        state.isLoading = false;
        state.error = payload ? payload : error.message ? error.message : "";
      });
  },
});

export const fixturesReducer = fixturesSlice.reducer;
