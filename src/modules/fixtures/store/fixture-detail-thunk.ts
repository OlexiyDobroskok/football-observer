import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DetailedFixtureParams,
  FixtureDetailInfoApp,
} from "api/types/fixtures-types";
import { FootballService } from "api/football-service";
import {
  FixtureDetailState,
  resetFixtureDetailReqStatus,
} from "./fixture-detail-slice";
import { generateDynamicKey } from "api/helpers/generateDynamicReqStatus";
import { AppDispatch } from "store/store";
import { sortEventsByTeamsLocationStatus } from "../helpers/convertEvents";
import { checkIsMatchLive } from "../helpers/checkIsMatchLive";
import { checkIsMatchScheduled } from "../helpers/checkIsMatchScheduled";
import { checkIsMatchFinished } from "../helpers/checkIsMatchFinished";
import { getTimeToMatch } from "../helpers/getTimeToMatch";

interface FixtureDetailData {
  fixtureDetail: FixtureDetailInfoApp;
  homeTeamId: number | undefined;
  awayTeamId: number | undefined;
  isLive: boolean;
  isScheduled: boolean;
  isFinished: boolean;
  timeToMatch: number | null;
  timerId: number | null;
}

export const fetchFixtureDetail = createAsyncThunk<
  FixtureDetailData,
  DetailedFixtureParams,
  {
    state: { fixtureDetail: FixtureDetailState };
    dispatch: AppDispatch;
    rejectValue: string;
  }
>(
  "fixture-detail/fetchFixtureDetail",
  async (params, { getState, dispatch, rejectWithValue }) => {
    try {
      const { fixtureDetail: fixtureDetailState } = getState();

      if (fixtureDetailState.timerId)
        window.clearTimeout(fixtureDetailState.timerId);

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
      const timeToMatch = getTimeToMatch(detailInfo.fixture.date);

      let timerId: number | null = null;

      if (!isLive && timeToMatch) {
        timerId = window.setTimeout(() => {
          dispatch(resetFixtureDetailReqStatus());
          dispatch(fetchFixtureDetail(params));
        }, timeToMatch);
      }

      if (isLive) {
        timerId = window.setTimeout(() => {
          dispatch(resetFixtureDetailReqStatus());
          dispatch(fetchFixtureDetail(params));
        }, 30000);
      }

      return {
        fixtureDetail,
        homeTeamId,
        awayTeamId,
        isLive,
        isFinished,
        isScheduled,
        timeToMatch,
        timerId,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (params, { getState }) => {
      const {
        fixtureDetail: { reqStatus, reqLocation, timerId },
      } = getState();
      const reqKey = generateDynamicKey({ params });
      const isLoading = !!reqStatus && reqStatus[reqKey] === "loading";
      const isSucceed = !!reqStatus && reqStatus[reqKey] === "succeeded";
      const currentLocation = window.location.pathname;
      if (!!reqLocation && !!timerId && currentLocation !== reqLocation) {
        window.clearTimeout(timerId);
        return false;
      }
      if (isLoading || isSucceed) return false;
    },
  }
);
