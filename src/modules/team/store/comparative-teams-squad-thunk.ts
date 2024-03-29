import { createAsyncThunk } from "@reduxjs/toolkit";
import { ComparativeTeamsSquadApp } from "../types/types";
import { ComparativeTeamSquadsParams } from "api/types/team-types";
import { ComparativeTeamsSquadState } from "./comparative-teams-squad-slice";
import { FootballService } from "api/football-service";
import { sortPlayersByPosition } from "../helpers/sort-players-by-position";
import { checkThunkCancel } from "api/helpers/check-thunk-cancel";

export const fetchComparativeTeamsSquad = createAsyncThunk<
  ComparativeTeamsSquadApp,
  ComparativeTeamSquadsParams,
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

      return checkThunkCancel<ComparativeTeamSquadsParams>({
        params,
        reqStatus,
      });
    },
  }
);
