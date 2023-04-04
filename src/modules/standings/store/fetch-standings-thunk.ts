import { createAsyncThunk } from "@reduxjs/toolkit";
import { footballApi, FootballApiResponse } from "api/football-service";
import {
  LeagueInformationApiResponse,
  StandingsResponse,
} from "modules/standings/types/types";

export type StandingsFetchError = string;
export interface LeagueQueryParams {
  leagueId: number;
  season: number;
}

export const fetchLeagueStandings = createAsyncThunk<
  LeagueInformationApiResponse,
  LeagueQueryParams,
  { rejectValue: StandingsFetchError }
>(
  "standings/fetchLeagueStandings",
  async ({ leagueId, season }, { rejectWithValue }) => {
    try {
      const url = `standings?league=${leagueId}&season=${season}`;
      const { data }: FootballApiResponse<StandingsResponse> =
        await footballApi.get(url);
      const [standingsResp] = data.response;
      return standingsResp.league;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
