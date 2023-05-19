import { Fixture } from "api/types/fixtures-types";
import { H2HStats } from "../types/types";
import { MatchStatistic } from "api/types/global";

interface H2HStatsArgs {
  homeTeamId: number;
  fixtures: Fixture[];
}

export const getH2HStats = ({ homeTeamId, fixtures }: H2HStatsArgs) => {
  const homeTeamTotal: MatchStatistic = { type: "Total", value: 0 };
  const awayTeamTotal: MatchStatistic = { type: "Total", value: 0 };
  const homeTeamHomeWins: MatchStatistic = { type: "Home", value: 0 };
  const awayTeamHomeWins: MatchStatistic = { type: "Home", value: 0 };
  const homeTeamAwayWins: MatchStatistic = { type: "Away", value: 0 };
  const awayTeamAwayWins: MatchStatistic = { type: "Away", value: 0 };
  const headToHeadStats: H2HStats = {
    played: 0,
    draws: 0,
    homeTeamWinStats: [homeTeamTotal, homeTeamHomeWins, homeTeamAwayWins],
    awayTeamWinStats: [awayTeamTotal, awayTeamHomeWins, awayTeamAwayWins],
  };

  fixtures.forEach(({ goals, teams: { home, away } }) => {
    const isFinished = goals.home !== null && goals.away !== null;
    const isDraw = isFinished && goals.home === goals.away;

    isFinished && headToHeadStats.played++;
    isDraw && headToHeadStats.draws++;

    if (home.id === homeTeamId && !isDraw && isFinished) {
      if (home.winner) {
        if (typeof homeTeamTotal.value === "number") {
          homeTeamTotal.value++;
        }
        if (typeof homeTeamHomeWins.value === "number") {
          homeTeamHomeWins.value++;
        }
      } else {
        if (typeof awayTeamTotal.value === "number") {
          awayTeamTotal.value++;
        }
        if (typeof awayTeamAwayWins.value === "number") {
          awayTeamAwayWins.value++;
        }
      }
    }

    if (away.id === homeTeamId && !isDraw && isFinished) {
      if (away.winner) {
        if (typeof homeTeamTotal.value === "number") {
          homeTeamTotal.value++;
        }
        if (typeof homeTeamAwayWins.value === "number") {
          homeTeamAwayWins.value++;
        }
      } else {
        if (typeof awayTeamTotal.value === "number") {
          awayTeamTotal.value++;
        }
        if (typeof awayTeamHomeWins.value === "number") {
          awayTeamHomeWins.value++;
        }
      }
    }
  });

  return headToHeadStats;
};
