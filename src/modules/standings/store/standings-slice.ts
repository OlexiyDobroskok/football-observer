import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  FormChar,
  LeagueStandingsReformed,
  PositionReformed,
} from "../types/types";
import { DynamicRequestStatus } from "api/types/global";
import { fetchLeagueStandings } from "./standings-thunk";
import { generateDynamicReqStatus } from "api/helpers/generateDynamicReqStatus";

export interface StandingsState {
  leagueData: LeagueStandingsReformed | undefined;
  isLoading: boolean;
  error: string | null;
  reqStatus: DynamicRequestStatus | null;
}

const initialState: StandingsState = {
  leagueData: undefined,
  isLoading: false,
  error: null,
  reqStatus: null,
};

const standingsSlice = createSlice({
  name: "standings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagueStandings.pending, (state, { meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "loading",
        });
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeagueStandings.fulfilled, (state, { payload, meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "succeeded",
        });
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
          state.reqStatus = generateDynamicReqStatus({
            params: meta.arg,
            status: "failed",
          });
          state.isLoading = false;
          state.error = payload ? payload : error.message ? error.message : "";
        }
      );
  },
});

export const standingsReducer = standingsSlice.reducer;
