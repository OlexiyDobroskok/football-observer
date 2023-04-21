import { createAsyncThunk } from "@reduxjs/toolkit";
import { LeagueInformation } from "api/types/leagues-types";
import { FootballService } from "api/football-service";

type FetchLeaguesError = string;

export const fetchLeagues = createAsyncThunk<
  LeagueInformation[],
  void,
  { rejectValue: FetchLeaguesError }
>("leagues/fetchLeagues", async (_, { rejectWithValue }) => {
  try {
    return await FootballService.getLeagues();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});
