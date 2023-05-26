import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LeagueStandingsApiResponse,
  StandingsParams,
} from "api/types/standings-types";
import { FootballService } from "api/football-service";
import { StandingsState } from "./standings-slice";
import { checkThunkCancel } from "api/helpers/check-thunk-cancel";

export const fetchLeagueStandings = createAsyncThunk<
  LeagueStandingsApiResponse,
  StandingsParams,
  { rejectValue: string; state: { standings: StandingsState } }
>(
  "standings/fetchLeagueStandings",
  async (params, { rejectWithValue }) => {
    try {
      return await FootballService.getStandings(params);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (params, { getState }) => {
      const {
        standings: { reqStatus },
      } = getState();

      return checkThunkCancel<StandingsParams>({ params, reqStatus });
    },
  }
);
