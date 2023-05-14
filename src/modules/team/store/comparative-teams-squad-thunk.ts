import { createAsyncThunk } from "@reduxjs/toolkit";
import { ComparativeTeamsSquadApp } from "../types/types";
import { ComparativeTeamsSquadParams } from "api/types/team-types";
import { ComparativeTeamsSquadState } from "./comparative-teams-squad-slice";
import { FootballService } from "api/football-service";
import { sortPlayersByPosition } from "../helpers/sort-players-by-position";
import { generateDynamicKey } from "api/helpers/generateDynamicReqStatus";

export const fetchComparativeTeamsSquad = createAsyncThunk<
  ComparativeTeamsSquadApp,
  ComparativeTeamsSquadParams,
  { state: { compSquad: ComparativeTeamsSquadState }; rejectValue: string }
>(
  "comp-squad/fetchComparativeTeamsSquad",
  async (params, { rejectWithValue }) => {
    try {
      const compSquad = await FootballService.getComparativeTeamsSquad(params);
      const [homeTeamSquad, awayTeamSquad] = compSquad;

      return {
        homeTeamSquad: {
          ...homeTeamSquad,
          players: sortPlayersByPosition(homeTeamSquad.players),
        },
        awayTeamSquad: {
          ...awayTeamSquad,
          players: sortPlayersByPosition(awayTeamSquad.players),
        },
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (params, { getState }) => {
      const {
        compSquad: { reqStatus },
      } = getState();
      const reqKey = generateDynamicKey({ params });
      const isLoading = !!reqStatus && reqStatus[reqKey] === "loading";
      const isSucceed = !!reqStatus && reqStatus[reqKey] === "succeeded";
      if (isLoading || isSucceed) return false;
    },
  }
);
