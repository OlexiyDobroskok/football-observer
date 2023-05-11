import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  FormChar,
  LeagueStandingsReformed,
  PositionReformed,
} from "../types/types";
import { DynamicRequestStatus } from "api/types/global";
import { fetchLeagueStandings } from "./standings-thunk";

export interface StandingsState {
  leagueData: LeagueStandingsReformed | undefined;
  isLoading: boolean;
  error: string | null;
  reqStatus: DynamicRequestStatus | undefined;
}

const initialState: StandingsState = {
  leagueData: undefined,
  isLoading: false,
  error: null,
  reqStatus: undefined,
};

const standingsSlice = createSlice({
  name: "standings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagueStandings.pending, (state, { meta }) => {
        const { leagueId, season } = meta.arg;
        const reqKey = leagueId.toString() + season.toString();
        state.reqStatus = { [reqKey]: "loading" };
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeagueStandings.fulfilled, (state, { payload, meta }) => {
        const { leagueId, season } = meta.arg;
        const reqKey = leagueId.toString() + season.toString();
        state.reqStatus = { [reqKey]: "succeeded" };
        const reformedStandings = payload.standings.flat().map(
          (position) =>
            ({
              ...position,
              form: position.form
                .split("")
                .map((char) => ({ id: uuidv4(), result: char as FormChar })),
            } as PositionReformed)
        );
        state.leagueData = { ...payload, standings: reformedStandings };
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchLeagueStandings.rejected,
        (state, { payload, meta, error }) => {
          const { leagueId, season } = meta.arg;
          const reqKey = leagueId.toString() + season.toString();
          state.reqStatus = { [reqKey]: "failed" };
          state.isLoading = false;
          state.error = payload ? payload : error.message ? error.message : "";
        }
      );
  },
});

export const standingsReducer = standingsSlice.reducer;
