import { createAsyncThunk } from "@reduxjs/toolkit";
import { Fixture, HeadToHeadArgs } from "api/types/fixtures-types";
import { FootballService } from "api/football-service";

export const fetchHeadToHeadFixtureInfo = createAsyncThunk<
  Fixture[],
  HeadToHeadArgs,
  { rejectValue: string }
>(
  "headToHead/fetchHeadToHeadFixtureInfo",
  async (params, { rejectWithValue }) => {
    try {
      return await FootballService.getHeadToHeadFixtureInfo(params);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
