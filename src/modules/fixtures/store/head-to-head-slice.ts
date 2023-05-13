import { createSlice } from "@reduxjs/toolkit";
import { Fixture } from "src/api/types/fixtures-types";
import { fetchHeadToHeadFixtureInfo } from "./head-to-head-thunk";
import { DynamicRequestStatus } from "api/types/global";
import { generateDynamicReqStatus } from "api/helpers/generateDynamicReqStatus";
import { H2HStats } from "../types/types";

export interface HeadToHeadState {
  headToHeadFixtures: Fixture[] | undefined;
  headToHeadStats: H2HStats | undefined;
  isLoading: boolean;
  error: string | null;
  reqStatus: DynamicRequestStatus | null;
}

const initialState: HeadToHeadState = {
  headToHeadFixtures: undefined,
  headToHeadStats: undefined,
  isLoading: false,
  error: null,
  reqStatus: null,
};

const headToHeadSlice = createSlice({
  name: "headToHead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeadToHeadFixtureInfo.pending, (state, { meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "loading",
        });
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchHeadToHeadFixtureInfo.fulfilled,
        (state, { payload, meta }) => {
          state.reqStatus = generateDynamicReqStatus({
            params: meta.arg,
            status: "succeeded",
          });
          state.headToHeadFixtures = payload.fixtures;
          state.headToHeadStats = payload.stats;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(
        fetchHeadToHeadFixtureInfo.rejected,
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

export const headToHeadReducer = headToHeadSlice.reducer;
