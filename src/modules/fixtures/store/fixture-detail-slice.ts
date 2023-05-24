import { createSlice } from "@reduxjs/toolkit";
import {
  ComparativeTeamsLineUps,
  FixtureDetailInfoApp,
  FixtureTeamsEventsAlt,
} from "../types/types";
import { fetchFixtureDetail } from "./fixture-detail-thunk";
import { DynamicRequestStatus } from "api/types/global";
import { generateDynamicReqStatus } from "api/helpers/generateDynamicReqStatus";
import { FixtureTeam } from "api/types/fixtures-types";
import { TeamSquadApi } from "api/types/team-types";

export interface FixtureDetailState {
  fixtureDetail: FixtureDetailInfoApp | undefined;
  fixtureEventsAlt: FixtureTeamsEventsAlt | undefined;
  homeTeam: FixtureTeam | undefined;
  awayTeam: FixtureTeam | undefined;
  comparativeTeamsLineUps: ComparativeTeamsLineUps | undefined;
  homeTeamSquad: TeamSquadApi | undefined;
  awayTeamSquad: TeamSquadApi | undefined;
  isLive: boolean;
  isScheduled: boolean;
  isFinished: boolean;
  isLoading: boolean;
  error: string | null;
  reqStatus: DynamicRequestStatus | null;
}

const initialState: FixtureDetailState = {
  fixtureDetail: undefined,
  fixtureEventsAlt: undefined,
  homeTeam: undefined,
  awayTeam: undefined,
  comparativeTeamsLineUps: undefined,
  homeTeamSquad: undefined,
  awayTeamSquad: undefined,
  isLive: false,
  isScheduled: false,
  isFinished: false,
  isLoading: false,
  error: null,
  reqStatus: null,
};

export const fixtureDetailSlice = createSlice({
  name: "fixture-detail",
  initialState,
  reducers: {
    resetFixtureDetailReqStatus: (state) => {
      state.reqStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixtureDetail.pending, (state, { meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "loading",
        });
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFixtureDetail.fulfilled, (state, { payload, meta }) => {
        state.reqStatus = generateDynamicReqStatus({
          params: meta.arg,
          status: "succeeded",
        });
        const {
          fixtureDetail,
          fixtureEventsAlt,
          comparativeTeamsLineUps,
          homeTeam,
          awayTeam,
          isLive,
          isFinished,
          isScheduled,
        } = payload;
        state.fixtureDetail = fixtureDetail;
        state.fixtureEventsAlt = fixtureEventsAlt;
        state.comparativeTeamsLineUps = comparativeTeamsLineUps;
        state.homeTeam = homeTeam;
        state.awayTeam = awayTeam;
        state.isLive = isLive;
        state.isFinished = isFinished;
        state.isScheduled = isScheduled;

        if (payload.homeTeamSquad && payload.awayTeamSquad) {
          state.homeTeamSquad = payload.homeTeamSquad;
          state.awayTeamSquad = payload.awayTeamSquad;
        }

        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchFixtureDetail.rejected,
        (state, { payload, error, meta }) => {
          state.reqStatus = generateDynamicReqStatus({
            params: meta.arg,
            status: "succeeded",
          });
          state.isLoading = false;
          state.error = payload ? payload : error.message ? error.message : "";
        }
      );
  },
});

export const { resetFixtureDetailReqStatus } = fixtureDetailSlice.actions;

export const fixtureDetailReducer = fixtureDetailSlice.reducer;
