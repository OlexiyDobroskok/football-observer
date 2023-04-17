import axios from "axios";
import { LeagueInformation, LeaguesParams } from "api/types/leagues-types";
import {
  RequiredStandingsParams,
  StandingsResponse,
} from "api/types/standings-types";

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
