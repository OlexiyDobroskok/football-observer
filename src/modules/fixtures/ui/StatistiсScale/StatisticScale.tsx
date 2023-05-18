import { TeamLocationStatus } from "api/types/global";
import classes from "./StatisticScale.module.scss";

export interface StatisticScaleProps {
  width: string | null;
  teamLocationStatus: TeamLocationStatus;
}

export const StatisticScale = ({
  width,
  teamLocationStatus,
}: StatisticScaleProps) => (
  <>
    {width && (
      <div
        className={[
          classes.scale,
          teamLocationStatus === "HOME" && classes.rightSide,
        ].join(" ")}
      >
        <div className={classes.scaleResult} style={{ width }}></div>
      </div>
    )}
  </>
);
