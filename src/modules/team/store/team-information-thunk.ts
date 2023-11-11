import { createAsyncThunk } from "@reduxjs/toolkit";
import { TeamInformation, TeamInformationParams } from "api/types/team-types";
import { TeamInfoState } from "./team-information-slice";
import { FootballService } from "api/football-service";
import { checkThunkCancel } from "api/helpers/check-thunk-cancel";

export const fetchTeamInformation = createAsyncThunk<
  TeamInformation,
  TeamInformationParams,
  { state: { teamInfo: TeamInfoState }; rejectValue: string }
>(
  "team-info/fetchTeamInformation",
  async (params, { rejectWithValue }) => {
    try {
      return await FootballService.getTeamInformation(params);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (params, { getState }) => {
      const {
        teamInfo: { reqStatus },
      } = getState();

      return checkThunkCancel<TeamInformationParams>({ params, reqStatus });
    },
  }
);
