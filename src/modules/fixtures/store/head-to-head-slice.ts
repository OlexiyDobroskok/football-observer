import { createSlice } from "@reduxjs/toolkit";
import { Fixture } from "src/api/types/fixtures-types";
import { fetchHeadToHeadFixtureInfo } from "./head-to-head-thunk";

interface HeadToHeadState {
  headToHeadInfo: Fixture[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HeadToHeadState = {
  headToHeadInfo: [],
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
        state.headToHeadInfo = payload;
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
