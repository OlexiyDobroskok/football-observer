import { createAsyncThunk } from "@reduxjs/toolkit";
import { FixtureDetailInfoApi } from "api/types/fixtures-types";
import { FootballService } from "api/football-service";

export const fetchFixtureDetail = createAsyncThunk<
  FixtureDetailInfoApi,
  number | string,
  { rejectValue: string }
>(
  "fixture-detail/fetchFixtureDetail",
  async (fixtureId, { rejectWithValue }) => {
    try {
      return await FootballService.getDetailFixtureInfo(fixtureId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
