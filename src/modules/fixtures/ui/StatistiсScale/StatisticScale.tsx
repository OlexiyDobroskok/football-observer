import { locationStatus, LocationStatus } from "api/helpers/consts";
import classes from "./StatisticScale.module.scss";

export interface StatisticScaleProps {
  width: string | null;
  teamLocationStatus: LocationStatus;
}

export const StatisticScale = ({
  width,
  teamLocationStatus,
}: StatisticScaleProps) => {
  const scaleClassName = [
    classes.scale,
    teamLocationStatus === locationStatus.home && classes.rightSide,
  ].join(" ");

  return (
    <div className={scaleClassName}>
      {width && <div className={classes.scaleResult} style={{ width }}></div>}
    </div>
  );
};
