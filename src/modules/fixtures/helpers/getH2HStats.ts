import { Fixture } from "api/types/fixtures-types";
import { H2HStats } from "../store/head-to-head-slice";

interface H2HStatsArgs {
  homeTeamId: number;
  fixtures: Fixture[];
}

export const getH2HStats = ({ homeTeamId, fixtures }: H2HStatsArgs) => {
  const headToHeadStats: H2HStats = {
    played: 0,
    draws: 0,
    homeTeamWinStats: { total: 0, home: 0, away: 0 },
    awayTeamWinStats: { total: 0, home: 0, away: 0 },
  };

  fixtures.forEach(({ goals, teams: { home, away } }) => {
    const isFinished = goals.home !== null && goals.away !== null;
    const isDraw = isFinished && goals.home === goals.away;

    isFinished && headToHeadStats.played++;
    isDraw && headToHeadStats.draws++;

    if (home.id === homeTeamId && !isDraw && isFinished) {
      if (home.winner) {
        headToHeadStats.homeTeamWinStats.total++;
        headToHeadStats.homeTeamWinStats.home++;
      } else {
        headToHeadStats.awayTeamWinStats.total++;
        headToHeadStats.awayTeamWinStats.away++;
      }
    }

    if (away.id === homeTeamId && !isDraw && isFinished) {
      if (away.winner) {
        headToHeadStats.homeTeamWinStats.total++;
        headToHeadStats.homeTeamWinStats.away++;
      } else {
        headToHeadStats.awayTeamWinStats.total++;
        headToHeadStats.awayTeamWinStats.home++;
      }
    }
  });

  return headToHeadStats;
};
