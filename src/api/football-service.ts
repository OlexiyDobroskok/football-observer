import axios from "axios";
import { LeagueInformation, LeaguesParams } from "api/types/leagues-types";
import {
  RequiredStandingsParams,
  StandingsResponse,
} from "api/types/standings-types";
import {
  AvailableFixtureParams,
  Fixture,
  FixtureDetailInfoApi,
  HeadToHeadArgs,
} from "api/types/fixtures-types";
import { throwDataError } from "./helpers/throwDataError";

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
    const { leagueId, teamId, season, type, current, search } = params || {};
    const { data }: FootballApiResponse<LeagueInformation[]> =
      await footballApi.get("leagues", {
        params: {
          id: leagueId,
          team: teamId,
          season,
          type,
          current,
          search,
        },
      });

    if (data.errors.length !== 0) {
      throwDataError(data.errors as DataError);
    }

    return data.response;
  }

  static async getStandings({
    leagueId,
    teamId,
    season,
  }: RequiredStandingsParams) {
    const { data }: FootballApiResponse<StandingsResponse[]> =
      await footballApi.get("standings", {
        params: {
          league: leagueId,
          team: teamId,
          season,
        },
      });

    if (data.errors.length !== 0) {
      throwDataError(data.errors as DataError);
    }

    const [standingsResp] = data.response;
    return standingsResp.league;
  }

  static async getAvailableFixtures({
    leagueId,
    teamId,
    season,
    status,
    from,
    to,
    live,
    date,
    nextFixtures,
    lastFixtures,
    round,
  }: Partial<AvailableFixtureParams>) {
    const { data }: FootballApiResponse<Fixture[]> = await footballApi.get(
      "fixtures",
      {
        params: {
          league: leagueId,
          team: teamId,
          last: lastFixtures,
          next: nextFixtures,
          season,
          status,
          from,
          to,
          live,
          date,
          round,
        },
      }
    );

    if (data.errors.length !== 0) {
      throwDataError(data.errors as DataError);
    }

    return data.response;
  }

  static async getDetailFixtureInfo(fixtureId: number | string) {
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
    firstTeamId,
    secondTeamId,
  }: HeadToHeadArgs) {
    const headToHeadParam = `${firstTeamId}-${secondTeamId}`;
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
}
