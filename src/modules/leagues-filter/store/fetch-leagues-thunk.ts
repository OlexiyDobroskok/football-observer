import { createAsyncThunk } from "@reduxjs/toolkit";
import { LeagueInformation } from "modules/leagues-filter/types/types";
import { footballApi, FootballApiResponse } from "api/football-service";

type FetchLeaguesError = string;
interface FetchLeaguesArgs {
  id: number;
  type: "league" | "cup";
  current: "true" | "false";
}

export const fetchLeagues = createAsyncThunk<
  LeagueInformation[],
  Partial<FetchLeaguesArgs>,
  { rejectValue: FetchLeaguesError }
>(
  "leagues-filter/fetchLeagues",
  async ({ id, type, current }, { rejectWithValue }) => {
    try {
      const { data }: FootballApiResponse<LeagueInformation> =
        await footballApi.get("leagues", {
          params: {
            id: id,
            type: type,
            current: current,
          },
        });
      return data.response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
