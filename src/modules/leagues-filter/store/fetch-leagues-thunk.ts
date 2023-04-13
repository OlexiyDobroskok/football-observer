import { createAsyncThunk } from "@reduxjs/toolkit";
import { LeagueInformation } from "modules/leagues-filter/api/types";
import {
  FetchLeaguesArgs,
  getAllLeagues,
} from "modules/leagues-filter/api/endpoints";

type FetchLeaguesError = string;

export const fetchLeagues = createAsyncThunk<
  LeagueInformation[],
  FetchLeaguesArgs,
  { rejectValue: FetchLeaguesError }
>("leagues-filter/fetchLeagues", async ({ type }, { rejectWithValue }) => {
  try {
    return await getAllLeagues({ type });
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
