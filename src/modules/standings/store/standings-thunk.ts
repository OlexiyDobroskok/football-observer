import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LeagueStandingsApiResponse,
  StandingsParams,
} from "api/types/standings-types";
import { FootballService } from "api/football-service";
import { StandingsState } from "./standings-slice";
import { generateDynamicKey } from "api/helpers/generateDynamicReqStatus";

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
      const reqKey = generateDynamicKey({ params });
      const isLoading = !!reqStatus && reqStatus[reqKey] === "loading";
      const isSucceed = !!reqStatus && reqStatus[reqKey] === "succeeded";
      if (isLoading || isSucceed) return false;
    },
  }
);
