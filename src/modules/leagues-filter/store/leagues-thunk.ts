import { createAsyncThunk } from "@reduxjs/toolkit";
import { LeagueInformation } from "api/types/leagues-types";
import { FootballService } from "api/football-service";
import { LeaguesState } from "./leagues-slice";

export const fetchLeagues = createAsyncThunk<
  LeagueInformation[],
  void,
  { rejectValue: string; state: { leagues: LeaguesState } }
>(
  "leagues/fetchLeagues",
  async (_, { rejectWithValue }) => {
    try {
      return await FootballService.getLeagues();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { leagues } = getState();
      const isLoading = leagues.reqStatus === "loading";
      const isSucceed = leagues.reqStatus === "succeeded";
      if (isLoading || isSucceed) return false;
    },
  }
);
