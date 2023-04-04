import { FC } from "react";
import classes from "./club-icon.module.scss";

interface ClubIconProps {
  icon: string;
}
export const ClubIcon: FC<ClubIconProps> = ({ icon }) => {
  return (
    <div className={classes.container}>
      <img className={classes.icon} src={icon} alt="" />
    </div>
  );
};
