import { createSlice } from "@reduxjs/toolkit";
import { TeamSquadApp } from "../types/types";
import { DynamicRequestStatus } from "api/types/global";
import { fetchComparativeTeamsSquad } from "./comparative-teams-squad-thunk";
import { generateDynamicReqStatus } from "api/helpers/generateDynamicReqStatus";

export interface ComparativeTeamsSquadState {
  homeTeamSquad: TeamSquadApp | undefined;
  awayTeamSquad: TeamSquadApp | undefined;
  isLoading: boolean;
  error: string | null;
  reqStatus: DynamicRequestStatus | null;
}

const initialState: ComparativeTeamsSquadState = {
  homeTeamSquad: undefined,
  awayTeamSquad: undefined,
  isLoading: false,
  error: null,
  reqStatus: null,
};

const comparativeTeamsSquadSlice = createSlice({
  name: "comp-squad",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComparativeTeamsSquad.pending, (state, { meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "loading",
        });
        state.error = null;
        state.isLoading = true;
      })
      .addCase(
        fetchComparativeTeamsSquad.fulfilled,
        (state, { payload, meta }) => {
          state.reqStatus = generateDynamicReqStatus({
            params: meta.arg,
            status: "succeeded",
          });
          state.error = null;
          state.isLoading = false;
          const { homeTeamSquad, awayTeamSquad } = payload;
          state.homeTeamSquad = homeTeamSquad;
          state.awayTeamSquad = awayTeamSquad;
        }
      )
      .addCase(
        fetchComparativeTeamsSquad.rejected,
        (state, { payload, error, meta }) => {
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

export const compSquadReducer = comparativeTeamsSquadSlice.reducer;
