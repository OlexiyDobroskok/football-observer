import { createAsyncThunk } from "@reduxjs/toolkit";
import { DetailedFixtureParams, FixtureTeam } from "api/types/fixtures-types";
import {
  ComparativeTeamsLineUps,
  FixtureDetailInfoApp,
  FixtureTeamsEventsAlt,
} from "../types/types";
import { FootballService } from "api/football-service";
import { FixtureDetailState } from "./fixture-detail-slice";
import { checkIsMatchLive } from "../helpers/check-is-match-live";
import { checkIsMatchScheduled } from "../helpers/check-is-match-scheduled";
import { checkIsMatchFinished } from "../helpers/check-is-match-finished";
import { sortEventsByTeam } from "../helpers/sort-events-by-team";
import { sortEventPlayers } from "../helpers/sort-event-players";
import { convertLineUps } from "../helpers/convert-line-ups";
import { checkThunkCancel } from "api/helpers/check-thunk-cancel";

interface FixtureDetailData {
  fixtureDetail: FixtureDetailInfoApp;
  fixtureEventsAlt: FixtureTeamsEventsAlt;
  homeTeam: FixtureTeam;
  awayTeam: FixtureTeam;
  isLive: boolean;
  isScheduled: boolean;
  isFinished: boolean;
  comparativeTeamsLineUps: ComparativeTeamsLineUps | null;
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
        homeTeamEvents: sortEventPlayers(fixtureDetail.events.homeTeam),
        awayTeamEvents: sortEventPlayers(fixtureDetail.events.awayTeam),
      };
      const matchStatus = detailInfo.fixture.status.short;
      const isLive = checkIsMatchLive(matchStatus);
      const isScheduled = checkIsMatchScheduled(matchStatus);
      const isFinished = checkIsMatchFinished(matchStatus);

      let comparativeTeamsLineUps: ComparativeTeamsLineUps | null = null;

      if (fixtureDetail.lineups.length) {
        const [homeTeamLineUpRes, awayTeamLineUpRes] = fixtureDetail.lineups;
        comparativeTeamsLineUps = {
          homeTeamLineUps: convertLineUps({
            resLineUp: homeTeamLineUpRes,
            events: fixtureDetail.events.homeTeam,
          }),
          awayTeamLineUps: convertLineUps({
            resLineUp: awayTeamLineUpRes,
            events: fixtureDetail.events.awayTeam,
          }),
        };
      }

      return {
        fixtureDetail,
        fixtureEventsAlt,
        comparativeTeamsLineUps,
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

      return checkThunkCancel<DetailedFixtureParams>({ params, reqStatus });
    },
  }
);
