import { TeamInformation } from "api/types/team-types";
import { DynamicRequestStatus } from "api/types/global";
import { createSlice } from "@reduxjs/toolkit";
import { generateDynamicReqStatus } from "api/helpers/generateDynamicReqStatus";
import { fetchTeamInformation } from "./team-information-thunk";

export interface TeamInfoState {
  teamInformation: TeamInformation | undefined;
  isLoading: boolean;
  error: string | null;
  reqStatus: DynamicRequestStatus | null;
}

const initialState: TeamInfoState = {
  teamInformation: undefined,
  isLoading: false,
  error: null,
  reqStatus: null,
};

const teamInfoSlice = createSlice({
  name: "team-info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamInformation.pending, (state, { meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "loading",
        });
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchTeamInformation.fulfilled, (state, { payload, meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "succeeded",
        });
        state.teamInformation = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchTeamInformation.rejected,
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

export const teamInfoReducer = teamInfoSlice.reducer;
