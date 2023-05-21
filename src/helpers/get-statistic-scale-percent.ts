import { GameStatisticValue } from "api/types/global";

interface GetStatisticScalePercentArgs {
  homeTeamValue: GameStatisticValue;
  awayTeamValue: GameStatisticValue;
}

interface StatisticScalePercent {
  homeTeamPercent: string | null;
  awayTeamPercent: string | null;
}

export const getStatisticScalePercent = ({
  homeTeamValue,
  awayTeamValue,
}: GetStatisticScalePercentArgs): StatisticScalePercent => {
  const isString =
    typeof homeTeamValue === "string" && typeof awayTeamValue === "string";
  const isPercent =
    isString && homeTeamValue.includes("%") && awayTeamValue.includes("%");

  const scale: StatisticScalePercent = {
    homeTeamPercent: "0%",
    awayTeamPercent: "0%",
  };

  if (isPercent) {
    scale.homeTeamPercent = homeTeamValue;
    scale.awayTeamPercent = awayTeamValue;
    return scale;
  }

  const homeValue =
    typeof homeTeamValue === "number"
      ? homeTeamValue
      : typeof homeTeamValue === "string"
      ? parseFloat(homeTeamValue)
      : 0;

  const awayValue =
    typeof awayTeamValue === "number"
      ? awayTeamValue
      : typeof awayTeamValue === "string"
      ? parseFloat(awayTeamValue)
      : 0;

  const sum = homeValue + awayValue;
  scale.homeTeamPercent = `${(homeValue * 100) / sum}%`;
  scale.awayTeamPercent = `${(awayValue * 100) / sum}%`;

  return scale;
};
