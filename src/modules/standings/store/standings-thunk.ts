import { createAsyncThunk } from "@reduxjs/toolkit";
import { LeagueStandingsApiResponse } from "modules/standings/api/types";
import {
  getLeagueStandings,
  LeagueQueryParams,
} from "modules/standings/api/endpoints";

export type StandingsFetchError = string;

export const fetchLeagueStandings = createAsyncThunk<
  LeagueStandingsApiResponse,
  LeagueQueryParams,
  { rejectValue: StandingsFetchError }
>(
  "standings/fetchLeagueStandings",
  async ({ leagueId, season }, { rejectWithValue }) => {
    try {
      return await getLeagueStandings({ leagueId, season });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
