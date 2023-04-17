import { createAsyncThunk } from "@reduxjs/toolkit";
import { LeagueStandingsApiResponse } from "api/types/standings-types";
import { FootballService } from "api/football-service";

export type StandingsFetchError = string;
interface LeagueStandingsArgs {
  leagueId: number;
  season: number;
}

export const fetchLeagueStandings = createAsyncThunk<
  LeagueStandingsApiResponse,
  LeagueStandingsArgs,
  { rejectValue: StandingsFetchError }
>(
  "standings/fetchLeagueStandings",
  async ({ leagueId, season }, { rejectWithValue }) => {
    try {
      return await FootballService.getStandings({ leagueId, season });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
