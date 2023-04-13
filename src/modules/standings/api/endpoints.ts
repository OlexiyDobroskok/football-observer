import { footballApi, FootballApiResponse } from "api/football-service";
import { StandingsResponse } from "modules/standings/api/types";

export interface LeagueQueryParams {
  leagueId: number;
  season: number;
}

export const getLeagueStandings = async ({
  leagueId,
  season,
}: LeagueQueryParams) => {
  const { data }: FootballApiResponse<StandingsResponse[]> =
    await footballApi.get("standings", {
      params: {
        league: leagueId,
        season: season,
      },
    });
  const [standingsResp] = data.response;
  return standingsResp.league;
};
