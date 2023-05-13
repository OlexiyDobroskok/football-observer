import { createSlice } from "@reduxjs/toolkit";
import { TeamSquadApp } from "../types/types";
import { DynamicRequestStatus } from "api/types/global";
import { fetchTeamSquad } from "./team-squad-thunk";
import { generateDynamicReqStatus } from "api/helpers/generateDynamicReqStatus";

export interface TeamSquadState {
  squad: TeamSquadApp | undefined;
  isLoading: boolean;
  error: string | null;
  reqStatus: DynamicRequestStatus | null;
}

const initialState: TeamSquadState = {
  squad: undefined,
  isLoading: false,
  error: null,
  reqStatus: null,
};

const teamSquadSlice = createSlice({
  name: "team-squad",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamSquad.pending, (state, { meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "loading",
        });
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchTeamSquad.fulfilled, (state, { payload, meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "succeeded",
        });
        state.squad = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchTeamSquad.rejected, (state, { payload, error, meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "failed",
        });
        state.isLoading = false;
        state.error = payload ? payload : error.message ? error.message : "";
      });
  },
});

export const teamSquadReducer = teamSquadSlice.reducer;
