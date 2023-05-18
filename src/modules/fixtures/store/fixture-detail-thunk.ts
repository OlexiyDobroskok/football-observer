import { createAsyncThunk } from "@reduxjs/toolkit";
import { DetailedFixtureParams } from "api/types/fixtures-types";
import { FixtureDetailInfoApp } from "../types/types";
import { FootballService } from "api/football-service";
import { FixtureDetailState } from "./fixture-detail-slice";
import { generateDynamicKey } from "api/helpers/generateDynamicReqStatus";
import { sortEventsByTeamsLocationStatus } from "../helpers/convertEvents";
import { checkIsMatchLive } from "../helpers/checkIsMatchLive";
import { checkIsMatchScheduled } from "../helpers/checkIsMatchScheduled";
import { checkIsMatchFinished } from "../helpers/checkIsMatchFinished";

interface FixtureDetailData {
  fixtureDetail: FixtureDetailInfoApp;
  homeTeamId: number | undefined;
  awayTeamId: number | undefined;
  isLive: boolean;
  isScheduled: boolean;
  isFinished: boolean;
}

export const fetchFixtureDetail = createAsyncThunk<
  FixtureDetailData,
  DetailedFixtureParams,
  {
    state: { fixtureDetail: FixtureDetailState };
    rejectValue: string;
  }
>(
  "fixture-detail/fetchFixtureDetail",
  async (params, { rejectWithValue }) => {
    try {
      const detailInfo = await FootballService.getDetailFixtureInfo(params);

      const homeTeamId = detailInfo.teams.home.id;
      const awayTeamId = detailInfo.teams.away.id;
      const fixtureDetail: FixtureDetailInfoApp = {
        ...detailInfo,
        events: sortEventsByTeamsLocationStatus({
          homeTeamId,
          awayTeamId,
          events: detailInfo.events,
        }),
      };
      const matchStatus = detailInfo.fixture.status.short;
      const isLive = checkIsMatchLive(matchStatus);
      const isScheduled = checkIsMatchScheduled(matchStatus);
      const isFinished = checkIsMatchFinished(matchStatus);

      return {
        fixtureDetail,
        homeTeamId,
        awayTeamId,
        isLive,
        isFinished,
        isScheduled,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (params, { getState }) => {
      const {
        fixtureDetail: { reqStatus },
      } = getState();
      const reqKey = generateDynamicKey({ params });
      const isLoading = !!reqStatus && reqStatus[reqKey] === "loading";
      const isSucceed = !!reqStatus && reqStatus[reqKey] === "succeeded";
      if (isLoading || isSucceed) return false;
    },
  }
);
