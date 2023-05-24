import { createAsyncThunk } from "@reduxjs/toolkit";
import { DetailedFixtureParams, FixtureTeam } from "api/types/fixtures-types";
import {
  ComparativeTeamsLineUps,
  FixtureDetailInfoApp,
  FixtureTeamsEventsAlt,
} from "../types/types";
import { FootballService } from "api/football-service";
import { FixtureDetailState } from "./fixture-detail-slice";
import { generateDynamicKey } from "api/helpers/generateDynamicReqStatus";
import { checkIsMatchLive } from "../helpers/check-is-match-live";
import { checkIsMatchScheduled } from "../helpers/check-is-match-scheduled";
import { checkIsMatchFinished } from "../helpers/check-is-match-finished";
import { sortEventsByTeam } from "../helpers/sort-events-by-team";
import { sortEventPlayers } from "../helpers/sort-event-players";
import {
  ComparativeTeamSquadsParams,
  TeamSquadApi,
} from "api/types/team-types";
import { convertLineUps } from "../helpers/convert-line-ups";

interface FixtureDetailData {
  fixtureDetail: FixtureDetailInfoApp;
  fixtureEventsAlt: FixtureTeamsEventsAlt;
  comparativeTeamsLineUps: ComparativeTeamsLineUps;
  homeTeam: FixtureTeam;
  awayTeam: FixtureTeam;
  isLive: boolean;
  isScheduled: boolean;
  isFinished: boolean;
  homeTeamSquad?: TeamSquadApi;
  awayTeamSquad?: TeamSquadApi;
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
  async (params, { getState, rejectWithValue }) => {
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

      const {
        fixtureDetail: {
          homeTeamSquad: homeTeamSquadState,
          awayTeamSquad: awayTeamSquadState,
        },
      } = getState();

      const [homeTeamLineUpRes, awayTeamLineUpRes] = fixtureDetail.lineups;

      if (
        homeTeamSquadState &&
        awayTeamSquadState &&
        homeTeamSquadState.team.id === homeTeam.id &&
        awayTeamSquadState.team.id === awayTeam.id
      ) {
        const comparativeTeamsLineUps = {
          homeTeamLineUps: convertLineUps({
            resLineUp: homeTeamLineUpRes,
            events: fixtureDetail.events.homeTeam,
            squad: homeTeamSquadState,
          }),
          awayTeamLineUps: convertLineUps({
            resLineUp: awayTeamLineUpRes,
            events: fixtureDetail.events.awayTeam,
            squad: awayTeamSquadState,
          }),
        };

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
      }

      const compTeamSquadsParams: ComparativeTeamSquadsParams = {
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
      };

      const compTeamSquads = await FootballService.getComparativeTeamsSquad(
        compTeamSquadsParams
      );

      if (!compTeamSquads.length) {
        return rejectWithValue("No Team Squads information!");
      }

      const [homeTeamSquad, awayTeamSquad] = compTeamSquads;

      const comparativeTeamsLineUps = {
        homeTeamLineUps: convertLineUps({
          resLineUp: homeTeamLineUpRes,
          events: fixtureDetail.events.homeTeam,
          squad: homeTeamSquad,
        }),
        awayTeamLineUps: convertLineUps({
          resLineUp: awayTeamLineUpRes,
          events: fixtureDetail.events.awayTeam,
          squad: awayTeamSquad,
        }),
      };

      return {
        fixtureDetail,
        fixtureEventsAlt,
        comparativeTeamsLineUps,
        homeTeamSquad,
        awayTeamSquad,
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
