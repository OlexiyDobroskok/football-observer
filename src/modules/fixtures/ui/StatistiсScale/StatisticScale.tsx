import classes from "./StatisticScale.module.scss";
import { TeamLocationStatus } from "api/types/global";

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
          classes.container,
          teamLocationStatus === "HOME" && classes.right,
        ].join(" ")}
      >
        <div className={classes.scale} style={{ width }}></div>
      </div>
    )}
  </>
);
