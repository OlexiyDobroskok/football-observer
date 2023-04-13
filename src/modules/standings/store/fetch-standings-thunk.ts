import { createAsyncThunk } from "@reduxjs/toolkit";
import { footballApi, FootballApiResponse } from "api/football-service";
import {
  LeagueStandingsApiResponse,
  StandingsResponse,
} from "modules/standings/types/types";

export type StandingsFetchError = string;
export interface LeagueQueryParams {
  leagueId: number;
  season: number;
}

export const fetchLeagueStandings = createAsyncThunk<
  LeagueStandingsApiResponse,
  LeagueQueryParams,
  { rejectValue: StandingsFetchError }
>(
  "standings/fetchLeagueStandings",
  async ({ leagueId, season }, { rejectWithValue }) => {
    try {
      const { data }: FootballApiResponse<StandingsResponse[]> =
        await footballApi.get("standings", {
          params: {
            league: leagueId,
            season: season,
          },
        });
      const [standingsResp] = data.response;
      return standingsResp.league;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
