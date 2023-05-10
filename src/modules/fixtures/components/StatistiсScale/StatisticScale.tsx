import classes from "./StatisticScale.module.scss";

export interface StatisticScaleProps {
  homeTeamValue: number | string | null;
  awayTeamValue: number | string | null;
  teamLocation: "HOME" | "AWAY";
}

export const StatisticScale = ({
  homeTeamValue,
  awayTeamValue,
  teamLocation,
}: StatisticScaleProps) => {
  const isValue = homeTeamValue !== null && awayTeamValue !== null;
  const isString =
    typeof homeTeamValue === "string" && typeof awayTeamValue === "string";
  const isPercent =
    isString && homeTeamValue.includes("%") && awayTeamValue.includes("%");
  const isNumber =
    typeof homeTeamValue === "number" && typeof awayTeamValue === "number";

  let scaleWidth = "";

  if (isString && !isPercent) {
    const homeValue = parseFloat(homeTeamValue);
    const awayValue = parseFloat(awayTeamValue);
    const sum = homeValue + awayValue;
    const percent =
      teamLocation === "HOME"
        ? (homeValue * 100) / sum
        : (awayValue * 100) / sum;
    scaleWidth = `${percent}%`;
  }

  if (isPercent) {
    scaleWidth = teamLocation === "HOME" ? homeTeamValue : awayTeamValue;
  }

  if (isNumber) {
    const sum = homeTeamValue + awayTeamValue;
    const percent =
      teamLocation === "HOME"
        ? (homeTeamValue * 100) / sum
        : (awayTeamValue * 100) / sum;
    scaleWidth = `${percent}%`;
  }

  return (
    <>
      {isValue && (
        <div
          className={[
            classes.container,
            teamLocation === "HOME" && classes.right,
          ].join(" ")}
        >
          <div className={classes.scale} style={{ width: scaleWidth }}></div>
        </div>
      )}
    </>
  );
};
