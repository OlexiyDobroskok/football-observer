import { footballApi, FootballApiResponse } from "api/football-service";
import { LeagueInformation } from "modules/leagues-filter/api/types";

export interface FetchLeaguesArgs {
  type?: "league" | "cup";
}

export const getAllLeagues = async ({ type }: FetchLeaguesArgs) => {
  const { data }: FootballApiResponse<LeagueInformation[]> =
    await footballApi.get("leagues", {
      params: {
        type: type,
      },
    });
  return data.response;
};
