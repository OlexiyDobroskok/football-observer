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
  const isNoValue = homeTeamValue === null && awayTeamValue === null;
  const isString =
    typeof homeTeamValue === "string" && typeof awayTeamValue === "string";
  const isPercent =
    isString && homeTeamValue.includes("%") && awayTeamValue.includes("%");
  const isNumber =
    typeof homeTeamValue === "number" && typeof awayTeamValue === "number";

  const scale: StatisticScalePercent = {
    homeTeamPercent: "0%",
    awayTeamPercent: "0%",
  };

  if (isPercent || isNoValue) {
    scale.homeTeamPercent = homeTeamValue;
    scale.awayTeamPercent = awayTeamValue;
  }

  if (isString && !isPercent) {
    const homeValue = parseFloat(homeTeamValue);
    const awayValue = parseFloat(awayTeamValue);
    const sum = homeValue + awayValue;
    scale.homeTeamPercent = `${(homeValue * 100) / sum}%`;
    scale.awayTeamPercent = `${(awayValue * 100) / sum}%`;
  }

  if (isNumber) {
    const sum = homeTeamValue + awayTeamValue;
    scale.homeTeamPercent = `${(homeTeamValue * 100) / sum}%`;
    scale.awayTeamPercent = `${(awayTeamValue * 100) / sum}%`;
  }

  return scale;
};
