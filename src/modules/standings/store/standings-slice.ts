import {
  FormChar,
  LeagueStandingsReformed,
  PositionReformed,
} from "modules/standings/api/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchLeagueStandings } from "modules/standings/store/fetch-standings-thunk";
import { v4 as uuidv4 } from "uuid";

export interface StandingsState {
  leagueData: LeagueStandingsReformed | undefined;
  isLoading: boolean;
  error: string;
}

const initialState: StandingsState = {
  leagueData: undefined,
  isLoading: false,
  error: "",
};

const standingsSlice = createSlice({
  name: "standings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeagueStandings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLeagueStandings.fulfilled, (state, { payload }) => {
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
      state.error = "";
    });
    builder.addCase(
      fetchLeagueStandings.rejected,
      (state, { payload, error }) => {
        state.isLoading = false;
        state.error = payload ? payload : error.message ? error.message : "";
      }
    );
  },
});

export const standingsReducer = standingsSlice.reducer;
