import { createAsyncThunk } from "@reduxjs/toolkit";
import { TeamSquadApp } from "../types/types";
import { TeamSquadParams } from "api/types/team-types";
import { TeamSquadState } from "./team-squad-slice";
import { FootballService } from "api/football-service";
import { sortPlayersByPosition } from "../helpers/sort-players-by-position";
import { checkThunkCancel } from "api/helpers/check-thunk-cancel";

export const fetchTeamSquad = createAsyncThunk<
  TeamSquadApp,
  TeamSquadParams,
  { state: { teamSquad: TeamSquadState }; rejectValue: string }
>(
  "team-squad/fetchTeamSquad",
  async (params, { rejectWithValue }) => {
    try {
      const teamSquad = await FootballService.getTeamSquad(params);

      return {
        ...teamSquad,
        players: sortPlayersByPosition(teamSquad.players),
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (params, { getState }) => {
      const {
        teamSquad: { reqStatus },
      } = getState();

      return checkThunkCancel<TeamSquadParams>({ params, reqStatus });
    },
  }
);
