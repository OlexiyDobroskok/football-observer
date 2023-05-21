import { createAsyncThunk } from "@reduxjs/toolkit";
import { DetailedFixtureParams, FixtureTeam } from "api/types/fixtures-types";
import { FixtureDetailInfoApp, FixtureTeamsEventsAlt } from "../types/types";
import { FootballService } from "api/football-service";
import { FixtureDetailState } from "./fixture-detail-slice";
import { generateDynamicKey } from "api/helpers/generateDynamicReqStatus";
import { checkIsMatchLive } from "../helpers/check-is-match-live";
import { checkIsMatchScheduled } from "../helpers/check-is-match-scheduled";
import { checkIsMatchFinished } from "../helpers/check-is-match-finished";
import { sortEventsByTeam } from "../helpers/sort-events-by-team";
import { sortPlayersByEvent } from "../helpers/sort-players-by-event";

interface FixtureDetailData {
  fixtureDetail: FixtureDetailInfoApp;
  fixtureEventsAlt: FixtureTeamsEventsAlt;
  homeTeam: FixtureTeam;
  awayTeam: FixtureTeam;
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

      const homeTeam = detailInfo.teams.home;
      const awayTeam = detailInfo.teams.away;
      const fixtureDetail: FixtureDetailInfoApp = {
        ...detailInfo,
        events: sortEventsByTeam({
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          events: detailInfo.events,
        }),
      };
      fixtureDetail.statistics.forEach((team) =>
        team.statistics.forEach((stat) => {
          if (stat.type.toLowerCase() === "expected_goals") {
            stat.type = "Expected Goals";
          }
        })
      );
      const fixtureEventsAlt: FixtureTeamsEventsAlt = {
        homeTeamEvents: sortPlayersByEvent(fixtureDetail.events.homeTeam),
        awayTeamEvents: sortPlayersByEvent(fixtureDetail.events.awayTeam),
      };
      const matchStatus = detailInfo.fixture.status.short;
      const isLive = checkIsMatchLive(matchStatus);
      const isScheduled = checkIsMatchScheduled(matchStatus);
      const isFinished = checkIsMatchFinished(matchStatus);

      return {
        fixtureDetail,
        fixtureEventsAlt,
        homeTeam,
        awayTeam,
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
