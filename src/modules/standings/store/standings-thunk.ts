import { createAsyncThunk } from "@reduxjs/toolkit";
import { LeagueStandingsApiResponse } from "api/types/standings-types";
import { FootballService } from "api/football-service";
import { StandingsState } from "./standings-slice";

export type StandingsFetchError = string;
interface LeagueStandingsArgs {
  leagueId: number;
  season: number;
}

export const fetchLeagueStandings = createAsyncThunk<
  LeagueStandingsApiResponse,
  LeagueStandingsArgs,
  { rejectValue: StandingsFetchError; state: { standings: StandingsState } }
>(
  "standings/fetchLeagueStandings",
  async ({ leagueId, season }, { rejectWithValue }) => {
    try {
      return await FootballService.getStandings({ leagueId, season });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: ({ leagueId, season }, { getState }) => {
      const { standings } = getState();
      const reqKey = leagueId.toString() + season.toString();
      const isLoading =
        !!standings.reqStatus && standings.reqStatus[reqKey] === "loading";
      const isSucceed =
        !!standings.reqStatus && standings.reqStatus[reqKey] === "succeeded";
      if (isLoading || isSucceed) return false;
    },
  }
);
