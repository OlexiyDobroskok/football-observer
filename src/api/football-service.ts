import axios from "axios";
import { LeagueInformation, LeaguesParams } from "api/types/leagues-types";
import { StandingsParams, StandingsResponse } from "api/types/standings-types";
import {
  FixturesParams,
  Fixture,
  FixtureDetailInfoApi,
  HeadToHeadArgs,
  DetailedFixtureParams,
} from "api/types/fixtures-types";
import { throwDataError } from "./helpers/throwDataError";
import {
  ComparativeTeamsSquad,
  ComparativeTeamSquadsParams,
  TeamSquadApi,
  TeamSquadParams,
} from "./types/team-types";

export interface DataError {
  [key: string]: string;
}

export interface FootballApiData<T> {
  errors: unknown[] | DataError;
  response: T;
}
export interface FootballApiResponse<T> {
  data: FootballApiData<T>;
  status: number;
  statusText: string;
}
export const footballApi = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": import.meta.env.VITE_API_SPORTS_KEY,
  },
});

export class FootballService {
  static async getLeagues(params?: Partial<LeaguesParams>) {
    const type = params?.type;
    const { data }: FootballApiResponse<LeagueInformation[]> =
      await footballApi.get("leagues", {
        params: {
          type,
        },
      });

    if (data.errors.length !== 0) {
      throwDataError(data.errors as DataError);
    }

    return data.response;
  }

  static async getStandings({ leagueId, season }: StandingsParams) {
    const { data }: FootballApiResponse<StandingsResponse[]> =
      await footballApi.get("standings", {
        params: {
          league: leagueId,
          season,
        },
      });

    if (data.errors.length !== 0) {
      throwDataError(data.errors as DataError);
    }

    const [standingsResp] = data.response;
    return standingsResp.league;
  }

  static async getAvailableFixtures({ leagueId, season }: FixturesParams) {
    const { data }: FootballApiResponse<Fixture[]> = await footballApi.get(
      "fixtures",
      {
        params: {
          league: leagueId,
          season,
        },
      }
    );

    if (data.errors.length !== 0) {
      throwDataError(data.errors as DataError);
    }

    return data.response;
  }

  static async getDetailFixtureInfo({ fixtureId }: DetailedFixtureParams) {
    const { data }: FootballApiResponse<FixtureDetailInfoApi[]> =
      await footballApi.get("fixtures", {
        params: {
          id: fixtureId,
        },
      });

    if (data.errors.length !== 0) {
      throwDataError(data.errors as DataError);
    }

    const [fixtureDetail] = data.response;
    return fixtureDetail;
  }

  static async getHeadToHeadFixtureInfo({
    homeTeamId,
    awayTeamId,
  }: HeadToHeadArgs) {
    const headToHeadParam = `${homeTeamId}-${awayTeamId}`;
    const { data }: FootballApiResponse<Fixture[]> = await footballApi.get(
      "fixtures/headtohead",
      {
        params: {
          h2h: headToHeadParam,
        },
      }
    );

    if (data.errors.length !== 0) {
      throwDataError(data.errors as DataError);
    }

    return data.response;
  }

  static async getTeamSquad({ teamId }: TeamSquadParams) {
    const { data }: FootballApiResponse<TeamSquadApi[]> = await footballApi.get(
      "players/squads",
      {
        params: {
          team: teamId,
        },
      }
    );

    if (data.errors.length !== 0) {
      throwDataError(data.errors as DataError);
    }

    const [teamSquad] = data.response;
    return teamSquad;
  }

  static async getComparativeTeamsSquad({
    homeTeamId,
    awayTeamId,
  }: ComparativeTeamSquadsParams): Promise<ComparativeTeamsSquad> {
    return await Promise.all([
      FootballService.getTeamSquad({ teamId: homeTeamId }),
      FootballService.getTeamSquad({ teamId: awayTeamId }),
    ]);
  }
}
