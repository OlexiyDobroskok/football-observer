import axios from "axios";
import { LeagueInformation } from "api/leagues-types";
import { StandingsResponse } from "api/standings-types";

interface FootballApiData<T> {
  response: T;
}
interface FootballApiResponse<T> {
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

export interface LeaguesParams {
  leagueId: number;
  teamId: number;
  season: number;
  type: "league" | "cup";
  current: "true" | "false";
  search: string;
}

interface StandingsParams {
  leagueId?: number;
  teamId?: number;
  season: number;
}

type LeagueOrTeam =
  | {
      leagueId: number;
      teamId?: number;
    }
  | {
      leagueId?: number;
      teamId: number;
    };

export type RequiredStandingsParams = StandingsParams & LeagueOrTeam;

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
    console.log(data.response);
    const [standingsResp] = data.response;
    return standingsResp.league;
  }
}
